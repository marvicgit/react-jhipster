import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITicket } from 'app/shared/model/ticket.model';
import { getEntities as getTickets } from 'app/entities/ticket/ticket.reducer';
import { IAttachment } from 'app/shared/model/attachment.model';
import { getEntity, updateEntity, createEntity, reset } from './attachment.reducer';

export const AttachmentUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const tickets = useAppSelector(state => state.ticket.entities);
  const attachmentEntity = useAppSelector(state => state.attachment.entity);
  const loading = useAppSelector(state => state.attachment.loading);
  const updating = useAppSelector(state => state.attachment.updating);
  const updateSuccess = useAppSelector(state => state.attachment.updateSuccess);

  const handleClose = () => {
    navigate('/attachment');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTickets({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...attachmentEntity,
      ...values,
      ticket: tickets.find(it => it.id.toString() === values.ticket.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...attachmentEntity,
          ticket: attachmentEntity?.ticket?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterApp.attachment.home.createOrEditLabel" data-cy="AttachmentCreateUpdateHeading">
            Create or edit a Attachment
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="attachment-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Name"
                id="attachment-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  minLength: { value: 3, message: 'This field is required to be at least 3 characters.' },
                }}
              />
              <ValidatedBlobField label="File" id="attachment-file" name="file" data-cy="file" openActionLabel="Open" />
              <ValidatedField id="attachment-ticket" name="ticket" data-cy="ticket" label="Ticket" type="select">
                <option value="" key="0" />
                {tickets
                  ? tickets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/attachment" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AttachmentUpdate;
