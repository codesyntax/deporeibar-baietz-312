import { getBaseUrl } from '@plone/volto/helpers';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { Toast, UniversalLink } from '@plone/volto/components';
import ModalForm from '@plone/volto/components/manage/Form/ModalForm';
import { expandToBackendURL } from '@plone/volto/helpers';
import { updateContent } from '@plone/volto/actions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Button,
  Header,
  List,
  ListContent,
  ListDescription,
  ListHeader,
  ListItem,
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
  Segment,
} from 'semantic-ui-react';
import { modifyIgoera } from '../../actions/modifyigoera';
import { Eguna } from '../Eguna';

import { ImageUploadModal } from '../ImageUploadModal';
import { RenderMendizaleakComma, egoerak } from '../utils';
import { Erreserbatu } from '../Erreserbatu';

import { useIntl } from 'react-intl';

export const IgoerarenXehetasunak = (props) => {
  const { item, onlyactions, onUpdate } = props;
  const mendiaTitle = item?.parent?.title || item.title;
  const [openEzJoan, setOpenEzJoan] = React.useState(false);
  const [showUpload, setShowUpload] = React.useState(false);
  const [changeDataForm, setChangeDataForm] = React.useState(false);

  const changeDataFormSchema = {
    fieldsets: [
      {
        behavior: 'plone',
        fields: ['egindako_eguna', 'mendizaleak'],
        id: 'default',
        title: 'Defektuzkoa',
      },
    ],
    properties: {
      egindako_eguna: {
        behavior: 'deporeibar.addon.content.igoera.IIgoera',
        description: '',
        factory: 'Date',
        title: 'Igoera egin zen eguna',
        type: 'string',
        widget: 'date',
      },
      mendizaleak: {
        behavior: 'deporeibar.addon.content.igoera.IIgoera',
        description: 'Idatzi bat lerro bakoitzean',
        factory: 'Text',
        title: 'Mendia igo zuten pertsonak',
        type: 'string',
        widget: 'textarea',
      },
    },
    required: [],
    title: 'Igoera',
  };

  const intl = useIntl();

  const dispatch = useDispatch();
  const igoera = useSelector((state) => state.igoera);
  const updateContentState = useSelector((state) => state.content.update);

  const oraindikEzToken = `oraindik-ez-${item.UID}`;
  const joannaizToken = `joan-naiz-${item.UID}`;
  const ezNaizJoanToken = `ez-naiz-joan-${item.UID}`;

  useEffect(() => {
    igoera?.['subrequests']?.[oraindikEzToken]?.loaded && onUpdate();
    igoera?.['subrequests']?.[oraindikEzToken]?.loaded &&
      toast.success(
        <Toast
          autoClose={3000}
          title={intl.formatMessage({
            id: 'igoerarenZainGaude',
            defaultMessage: 'Zure igoeraren argazkien zain gaude!',
          })}
          content={intl.formatMessage(
            {
              id: 'erreserbaErrekuperatuta',
              defaultMessage: '{title} mendiaren erreserba errekuperatu dugu.',
            },
            { title: mendiaTitle },
          )}
        />,
      );
    igoera?.['subrequests']?.[oraindikEzToken]?.error &&
      toast.error(
        <Toast
          autoClose={3000}
          title={intl.formatMessage({
            id: 'errorea',
            defaultMessage: 'Errore bat gertatu da',
          })}
          content={`${igoera.modify.error.response.body.msg}`}
        />,
      );
  }, [igoera?.['subrequests']?.[oraindikEzToken]]);

  useEffect(() => {
    igoera?.['subrequests']?.[joannaizToken]?.loaded && onUpdate();
    igoera?.['subrequests']?.[joannaizToken]?.loaded &&
      toast.success(
        <Toast
          autoClose={3000}
          title={intl.formatMessage(
            {
              id: 'mendiraJoanNaiz',
              defaultMessage: 'Zorionak! {title} mendira joan zara.',
            },
            { title: mendiaTitle },
          )}
          content={intl.formatMessage({
            id: 'joandakoGisaMarkatu',
            defaultMessage:
              'Beste botoia erabiliz esaiguzu noiz joan zaren eta nortzuk igo zareten mesedez!',
          })}
        />,
      );
  }, [igoera?.['subrequests']?.[joannaizToken]]);

  useEffect(() => {
    igoera?.['subrequests']?.[ezNaizJoanToken]?.loaded && onUpdate();
    igoera?.['subrequests']?.[ezNaizJoanToken]?.loaded &&
      toast.success(
        <Toast
          autoClose={3000}
          title={intl.formatMessage(
            {
              id: 'ezZaraJoanMendira',
              defaultMessage: 'Ez zara {title} mendira joan',
            },
            { title: mendiaTitle },
          )}
          content={intl.formatMessage({
            id: 'ezJoandakoGisaMarkatu',
            defaultMessage: 'Zure igoera ez joandako gisa markatu dugu',
          })}
        />,
      );
  }, [igoera?.['subrequests']?.[ezNaizJoanToken]]);

  useEffect(() => {
    !updateContentState?.loading && updateContentState?.loaded && onUpdate();
  }, [updateContentState]);

  const OraindikEzNaizJoan = (props) => {
    const { item } = props;
    dispatch(
      modifyIgoera(
        expandToBackendURL(item['@id']),
        {
          egoera: 'zain',
        },
        {},
        oraindikEzToken,
      ),
    );
  };

  const joanNaiz = (item) => {
    dispatch(
      modifyIgoera(
        expandToBackendURL(item['@id']),
        {
          egoera: 'eginda',
        },
        {},
        joannaizToken,
      ),
    );
  };

  const EzNaizJoan = (props) => {
    const { item } = props;

    dispatch(
      modifyIgoera(
        expandToBackendURL(item['@id']),
        {
          egoera: 'bertan-behera',
        },
        {},
        ezNaizJoanToken,
      ),
    );
  };

  return (
    <Segment>
      <List divided relaxed>
        {!onlyactions && (
          <>
            <ListItem>
              <ListContent>
                <ListHeader>
                  <FormattedMessage
                    id="noiz"
                    defaultMessage="Noizko erreserbatua"
                  />
                </ListHeader>
                <ListDescription>
                  <Eguna date={item.eguna} />
                </ListDescription>
              </ListContent>
            </ListItem>
            <ListItem>
              <ListContent>
                <ListHeader>
                  <FormattedMessage
                    id="noizEginda"
                    defaultMessage="Noiz igota"
                  />
                </ListHeader>
                <ListDescription>
                  {item.egindako_eguna ? (
                    <Eguna date={item.egindako_eguna} />
                  ) : (
                    <span>Ez dago daturik</span>
                  )}
                </ListDescription>
              </ListContent>
            </ListItem>
            <ListItem>
              <ListContent>
                <ListHeader>
                  <FormattedMessage
                    id="mendizaleakIgoZirenak"
                    defaultMessage="Igo ziren mendizaleak"
                  />
                </ListHeader>
                <ListDescription>
                  <RenderMendizaleakComma mendizaleak={item.mendizaleak} />
                </ListDescription>
              </ListContent>
            </ListItem>
            <ListItem>
              <ListContent>
                <ListHeader>
                  <FormattedMessage id="mendia" defaultMessage="Mendia" />
                </ListHeader>
                <ListDescription>
                  <UniversalLink item={item.parent}>
                    {item.parent.title}
                  </UniversalLink>
                </ListDescription>
              </ListContent>
            </ListItem>
            <ListItem>
              <ListContent>
                <ListHeader>
                  <FormattedMessage id="egoera" defaultMessage="Egoera" />
                </ListHeader>
                <ListDescription>{egoerak[item.egoera.token]}</ListDescription>
              </ListContent>
            </ListItem>
          </>
        )}

        {['eginda', 'proposatutakoa-eginda'].includes(item.egoera.token) && (
          <ListItem>
            <ListContent>
              <ListHeader>
                <FormattedMessage
                  id="ikusiArgazkiak"
                  defaultMessage="Ikusi argazkiak"
                />
              </ListHeader>
              <ListDescription>
                <UniversalLink item={item} className="ui button">
                  <FormattedMessage
                    id="ikusiArgazkiak"
                    defaultMessage="Ikusi argazkiak"
                  />
                </UniversalLink>
                <Button onClick={() => setShowUpload(true)}>
                  <FormattedMessage
                    id="argazkiGehiagoKargatu"
                    defaultMessage="Argazki gehiago kargatu"
                  />
                </Button>
                <Button onClick={() => setChangeDataForm(true)}>
                  <FormattedMessage
                    id="igoerarenDatuakAldatu"
                    defaultMessage="Igoeraren data eta mendizaleak aldatu"
                  />
                </Button>
                <ModalForm
                  title={intl.formatMessage({
                    id: 'titleDatuakAldatu',
                    defaultMessage: 'Igoeraren datuak aldatu',
                  })}
                  schema={changeDataFormSchema}
                  open={changeDataForm}
                  formData={{
                    egindako_eguna: item.egindako_eguna,
                    mendizaleak: item.mendizaleak,
                  }}
                  onCancel={() => setChangeDataForm(false)}
                  onSubmit={(formData, setStateCallBack) => {
                    dispatch(updateContent(item['@id'], formData));
                    setChangeDataForm(false);
                    toast.success(
                      <Toast
                        autoClose={3000}
                        title={intl.formatMessage(
                          {
                            id: 'datuakaldatudira',
                            defaultMessage: 'Datuak ondo aldatu dira',
                          },
                          { title: mendiaTitle },
                        )}
                        content={intl.formatMessage({
                          id: 'datuakMendizaleaEtaData',
                          defaultMessage:
                            'Eskerrik asko igoeraren data eta mendizaleak esateagatik',
                        })}
                      />,
                    );
                  }}
                />
                ;
                <ImageUploadModal
                  key={item.UID}
                  open={showUpload}
                  onCancel={() => setShowUpload(false)}
                  onOk={() => {
                    joanNaiz(item);
                    setShowUpload(false);
                  }}
                  pathname={getBaseUrl(item['@id'])}
                  multiple={true}
                  accept={['image/*']}
                  maxSize={20000000}
                />
              </ListDescription>
            </ListContent>
          </ListItem>
        )}

        {['zain', 'proposatutakoa'].includes(item.egoera.token) && (
          <ListItem>
            <ListContent>
              <ListHeader>
                <FormattedMessage
                  id="egoeraAldatu"
                  defaultMessage="Egoera aldatu"
                />
              </ListHeader>
              <ListDescription>
                <Modal
                  onClose={() => setOpenEzJoan(false)}
                  onOpen={() => setOpenEzJoan(true)}
                  open={openEzJoan}
                  trigger={
                    <Button>
                      <FormattedMessage
                        id="ezNaizJoan"
                        defaultMessage="Ez naiz joan"
                      />
                    </Button>
                  }
                >
                  <ModalHeader>
                    <FormattedMessage
                      id="ezzaraJoanGaldera"
                      defaultMessage="Ez zara joan?"
                    />
                  </ModalHeader>
                  <ModalContent>
                    <ModalDescription>
                      <Header>
                        <FormattedMessage
                          id="ezzaraJoanGaldera"
                          defaultMessage="Ez zara joan?"
                        />
                      </Header>
                      <p>
                        <FormattedMessage
                          id="ezzarajoanAzalpena"
                          defaultMessage="Azkenean mendi honetara ez bazara joan, esaiguzu mesedez. Nahi baduzu ez joatearen arrazoiak ere esan ditzakezu"
                        />
                      </p>
                    </ModalDescription>
                  </ModalContent>
                  <ModalActions>
                    <Button color="red" onClick={() => setOpenEzJoan(false)}>
                      <FormattedMessage id="utzi" defaultMessage="Utzi" />
                    </Button>
                    <Button
                      content="Ez, ez naiz joan"
                      onClick={() => {
                        EzNaizJoan({ item: item });
                        setOpenEzJoan(false);
                      }}
                      positive
                    />
                  </ModalActions>
                </Modal>

                <Button onClick={() => setShowUpload(true)}>
                  <FormattedMessage id="joanNaiz" defaultMessage="Joan naiz!" />
                </Button>

                <ImageUploadModal
                  key={item.UID}
                  open={showUpload}
                  onCancel={() => setShowUpload(false)}
                  onOk={() => {
                    joanNaiz(item);
                    setShowUpload(false);
                  }}
                  pathname={getBaseUrl(item['@id'])}
                  multiple={true}
                  accept={['image/*']}
                  maxSize={20000000}
                />
              </ListDescription>
            </ListContent>
          </ListItem>
        )}

        {item.egoera.token === 'bertan-behera' && (
          <ListItem>
            <ListContent>
              <ListHeader>
                {' '}
                <FormattedMessage
                  id="egoeraAldatu"
                  defaultMessage="Egoera aldatu"
                />
              </ListHeader>
              <ListDescription>
                <Erreserbatu
                  item={item.parent}
                  onUpdate={() => {
                    onUpdate();
                  }}
                />
              </ListDescription>
            </ListContent>
          </ListItem>
        )}
      </List>
    </Segment>
  );
};
