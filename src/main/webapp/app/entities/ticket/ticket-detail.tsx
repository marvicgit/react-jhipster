import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './ticket.reducer';

export const TicketDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const ticketEntity = useAppSelector(state => state.ticket.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ticketDetailsHeading">Ticket</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{ticketEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{ticketEntity.title}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{ticketEntity.description}</dd>
          <dt>
            <span id="dueDate">Due Date</span>
          </dt>
          <dd>{ticketEntity.dueDate ? <TextFormat value={ticketEntity.dueDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="date">Date</span>
          </dt>
          <dd>{ticketEntity.date ? <TextFormat value={ticketEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{ticketEntity.status}</dd>
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{ticketEntity.type}</dd>
          <dt>
            <span id="priority">Priority</span>
          </dt>
          <dd>{ticketEntity.priority}</dd>
          <dt>Project</dt>
          <dd>{ticketEntity.project ? ticketEntity.project.name : ''}</dd>
          <dt>Assigned To</dt>
          <dd>{ticketEntity.assignedTo ? ticketEntity.assignedTo.login : ''}</dd>
          <dt>Reported By</dt>
          <dd>{ticketEntity.reportedBy ? ticketEntity.reportedBy.login : ''}</dd>
          <dt>Label</dt>
          <dd>
            {ticketEntity.labels
              ? ticketEntity.labels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.label}</a>
                    {ticketEntity.labels && i === ticketEntity.labels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/ticket" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ticket/${ticketEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default TicketDetail;
