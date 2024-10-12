import React from 'react';
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import Form from '@plone/volto/components/manage/Form/Form';
import { getContent } from '@plone/volto/actions';
import { addIgoera } from '../../actions/addigoera';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';
import { expandToBackendURL } from '@plone/volto/helpers';
import jwtDecode from 'jwt-decode';

import Login from '@plone-collective/volto-authomatic/components/Login/Login';

import { Message } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

const ErreserbaSchema = {
  title: 'Erreserba',
  properties: {
    ekintza_data: {
      title: 'Ekintza egingo den data',
      description: 'Aurreikusita duzun data',
      type: 'date',
      widget: 'date',
    },
    oharrak: {
      title: 'Oharrak',
      description:
        'Idatzi hemen zure oharrak, zein asmo duzun, norekin zoazen, ...',
      type: 'string',
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'Erreserba',
      fields: ['ekintza_data', 'oharrak'],
    },
  ],
  required: ['ekintza_data', 'oharrak'],
};

export const Erreserbatu = (props) => {
  const { item, onUpdate } = props;
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const token = useSelector((state) => state?.userSession?.token);
  const igoera = useSelector((state) => state.igoera);
  const user = token ? jwtDecode(token) : null;

  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const now = `${date.getFullYear()}-${month}-${date.getDate()}`;

  const igoeraRef = React.useRef(igoera);


  const userSubRequestToken = `${user?.sub}-${item.UID}`;

  React.useEffect(() => {
    !igoeraRef?.current.add?.loaded &&
      igoera?.add?.loaded &&
      igoera?.data &&
      onUpdate();
    !igoeraRef?.current.add?.loaded &&
      igoera?.add?.loaded &&
      igoera?.data &&
      toast.success(
        <Toast
          autoClose={3000}
          title={
            <FormattedMessage
              id="erreserbaEginda"
              defaultMessage="Erreserba eginda"
            />
          }
          content={
            <FormattedMessage
              id="erreserbaOndoGordeDa"
              defaultMessage="Erreserba ondo gorde da"
            />
          }
        />,
      );

    !igoeraRef?.current.add?.loaded &&
      igoera?.add?.error &&
      toast.error(
        <Toast
          autoClose={3000}
          title={
            <FormattedMessage
              id="erreserbaEzinDaEgin"
              defaultMessage="Erreserba ezin da egin"
            />
          }
          content={
            <FormattedMessage
              id="erroreBatGertatuDa"
              defaultMessage="Errore bat gertatu da: {error}"
              values={{ error: igoera.add.error.response.body.msg }}
            />
          }
        />,
      );
    igoeraRef.current = igoera;

    return () => {};
  }, [igoera?.add?.error, igoera?.add?.loaded]);

  const handleSubmit = (event, item) => {
    dispatch(
      addIgoera(expandToBackendURL(item['@id']), {
        '@type': 'Igoera',
        title: `${user.sub} - ${now}`,
        eguna: event.ekintza_data,
        oharrak: event.oharrak,
        egoera: 'zain',
      }),
    );
  };

  const erreserba =
    user?.sub && item?.items
      ? item.items.filter(
          (erre) => erre?.creators[0] === user?.sub && erre.egoera === 'zain',
        )
      : null;

  return (
    (!erreserba || erreserba.length === 0) && (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => {
          dispatch(getContent(item['@id'], null, 'erreserba'));
          setOpen(true);
        }}
        open={open}
        trigger={
          <Button className="erreserbatu">
            <FormattedMessage id="erreserbatu" defaultMessage="Erreserbatu" />
          </Button>
        }
      >
        <ModalHeader>
          <FormattedMessage
            id="mendiaErreserbatu"
            defaultMessage="Mendia erreserbatu"
          />
        </ModalHeader>
        <ModalContent>
          {user ? (
            erreserba && erreserba.length > 0 ? (
              <Message>
                <Message.Header>
                  {' '}
                  <FormattedMessage
                    id="erreserbaegindajada"
                    defaultMessage="Erreserba bat egina duzu jada"
                  />
                </Message.Header>
                <Message.Content>
                  <FormattedMessage
                    id="erreserbaegindajadaadi"
                    defaultMessage="Adi: jada eginda duzu mendi honetarako igoera baten erreserba"
                  />
                </Message.Content>
              </Message>
            ) : (
              <ModalDescription>
                <p>
                  <FormattedMessage
                    id="erreserbaAzalpena"
                    defaultMessage="Mendi honetara igotzeko asmoa baduzu 'erreserba' bat egin dezakezu. Errserbarekin mendi hori igo nahi duzula eta noiz igo nahi duzun adieraziko duzu. Igo ostean gailurreko argazkiak bidali iezazkiguzu mesedez eta hementxe argitaratuko ditugu."
                  />
                </p>

                <Form
                  schema={ErreserbaSchema}
                  onSubmit={(event) => {
                    handleSubmit(event, item);
                    setOpen(false);
                  }}
                />
              </ModalDescription>
            )
          ) : (
            <Login />
          )}
        </ModalContent>
        <ModalActions>
          <Button color="black" onClick={() => setOpen(false)}>
            <FormattedMessage id="itxi" defaultMessage="Itxi" />
          </Button>
        </ModalActions>
      </Modal>
    )
  );
};
