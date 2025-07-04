import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import allLocales from '@fullcalendar/core/locales-all';
import { flattenToAppURL } from '@plone/volto/helpers';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { RRule, rrulestr } from 'rrule';
import messages from '../FullCalendar/messages';
import config from '@plone/volto/registry';

/* returns all events, computed by the reccurence rule of an Event item */
const expand = (item) => {
  let recurrence = item.recurrence;
  if (item.recurrence.indexOf('DTSTART') < 0) {
    var dtstart = RRule.optionsToString({
      dtstart: new Date(item.start),
    });
    recurrence = dtstart + '\n' + recurrence;
  }

  const rrule = rrulestr(recurrence, { unfold: true, forceset: true });

  return rrule.all().map((date) => {
    /* rrule.all() only gives us dates, so we add time part of
       our original event: item.start (`2022-03-01T09:00:00+00:00`) */
    let dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    let startStr = dateStr + item.start.slice(10);
    let endStr = dateStr + item.end.slice(10);
    /* and return full object for FullCalendar */
    return {
      title: item.title,
      start: startStr,
      end: endStr,
      url: flattenToAppURL(item['@id']),
      groupId: item['@id'],
    };
  });
};

const FullCalendarListing = ({ items, moment: momentlib, ...props }) => {
  const intl = useIntl();

  const moment = momentlib.default;
  moment.locale(intl.locale);

  /* server-side rendering with FullCalendar does not work here,
     so we need to render after client-side hydration - as described here:
     https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#option-2-lazily-show-component-with-uselayouteffect
  */
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  let recurrences = [];

  const contentConverters =
    config.blocks.blocksConfig.fullcalendar.contentConverters;

  const filterItem = (item) => {
    // check whether we have registered a converter
    // for this item's type
    if (Object.keys(contentConverters).includes(item['@type'])) {
      return true;
    }

    // Check the recurrence thing
    if (item.recurrence) {
      recurrences = recurrences.concat(expand(item));
      /* expand returns initial event as well, so we skip it here */
      return false;
    }
    // Check if this item has a 'start' and 'end' attributes
    if (item.start && item.end) {
      return true;
    }

    // If everything fails, this is not something
    // to be shown in the calendar
    return false;
  };

  const convertItem = (item) => {
    // Try to look in the block configuration whether there is any converter
    // for the current item's type
    if (Object.keys(contentConverters).includes(item['@type'])) {
      return contentConverters[item['@type']](item);
    }

    // As we have already checked in the filterItem that this item
    // has 'start' and 'end' attributes, it is safe to return them
    // if there is no converter available
    return {
      start: item.start,
      end: item.end,
      title: item.title,
      url: item['@id'],
    };
  };

  let events = items
    .filter((i) => {
      return filterItem(i);
    })
    .map((i) => {
      return convertItem(i);
    });

  events = events.concat(recurrences);

  events = events.map((event) => {
    let start = new Date(event.start);
    let end = new Date(event.end);
    if (
      start.getHours() === 0 &&
      start.getMinutes() === 0 &&
      end.getHours() === 23 &&
      end.getMinutes() === 59
    ) {
      /* full day event */
      event.allDay = true;
    }
    if (
      /* open end event */
      end.getHours() === 23 &&
      end.getMinutes() === 59
    ) {
      delete event.end;
    }
    return event;
  });

  const fcOptions = {
    initialDate: props.initial_date || null,
    plugins: [dayGridPlugin, listPlugin, timeGridPlugin],
    buttonText: {
      dayGridMonth: intl.formatMessage(messages.labelDayGridMonth),
      timeGridWeek: intl.formatMessage(messages.labelTimeGridWeek),
      timeGridDay: intl.formatMessage(messages.labelTimeGridDay),
      listDay: intl.formatMessage(messages.labelListDay),
      listWeek: intl.formatMessage(messages.labelListWeek),
      listMonth: intl.formatMessage(messages.labelListMonth),
      today: intl.formatMessage(messages.labelToday),
    },
    headerToolbar: {
      left: props.toolbar_left?.join(','),
      center: props.toolbar_center?.join(','),
      right: props.toolbar_right?.join(','),
    },
    initialView: props.initial_view ?? 'dayGridMonth',
    titleFormat: {
      year: props.title_format_year,
      month: props.title_format_month,
      day: props.title_format_day,
    },
    locales: allLocales,
    locale: intl.locale ?? 'en',
  };

  return isClientSide && <FullCalendar events={events} {...fcOptions} />;
};

export default injectLazyLibs(['moment'])(FullCalendarListing);
