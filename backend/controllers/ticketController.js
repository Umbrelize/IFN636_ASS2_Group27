const ticketFacade = require('../services/TicketFacade');

const handleError = (res, error) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({ message: error.message });
};

const createTicket = async (req, res) => {
  try {
    const ticket = await ticketFacade.createTicket(req.user, req.body, req.file);
    res.status(201).json(ticket);
  } catch (error) {
    handleError(res, error);
  }
};

const getMyTickets = async (req, res) => {
  try {
    const tickets = await ticketFacade.getMyTickets(req.user);
    res.status(200).json(tickets);
  } catch (error) {
    handleError(res, error);
  }
};

const getMyTicketById = async (req, res) => {
  try {
    const ticket = await ticketFacade.getMyTicketById(req.params.id, req.user);
    res.status(200).json(ticket);
  } catch (error) {
    handleError(res, error);
  }
};

const getTicketActivity = async (req, res) => {
  try {
    const logs = await ticketFacade.getTicketActivity(req.params.id, req.user);
    res.status(200).json(logs);
  } catch (error) {
    handleError(res, error);
  }
};

const updateMyTicket = async (req, res) => {
  try {
    const updatedTicket = await ticketFacade.updateMyTicket(
      req.params.id,
      req.user,
      req.body,
      req.file
    );

    res.status(200).json(updatedTicket);
  } catch (error) {
    handleError(res, error);
  }
};

const updateMyTicketStatus = async (req, res) => {
  try {
    const updatedTicket = await ticketFacade.updateMyTicketStatus(
      req.params.id,
      req.user,
      req.body.status
    );

    res.status(200).json(updatedTicket);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteMyTicket = async (req, res) => {
  try {
    await ticketFacade.deleteMyTicket(req.params.id, req.user);
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketFacade.getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    handleError(res, error);
  }
};

const getAnyTicketById = async (req, res) => {
  try {
    const ticket = await ticketFacade.getAnyTicketById(req.params.id);
    res.status(200).json(ticket);
  } catch (error) {
    handleError(res, error);
  }
};

const updateAnyTicket = async (req, res) => {
  try {
    const updatedTicket = await ticketFacade.updateAnyTicket(
      req.params.id,
      req.user,
      req.body,
      req.file
    );

    res.status(200).json(updatedTicket);
  } catch (error) {
    handleError(res, error);
  }
};

const updateAnyTicketStatus = async (req, res) => {
  try {
    const updatedTicket = await ticketFacade.updateAnyTicketStatus(
      req.params.id,
      req.user,
      req.body.status
    );

    res.status(200).json(updatedTicket);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteAnyTicket = async (req, res) => {
  try {
    await ticketFacade.deleteAnyTicket(req.params.id, req.user);
    res.status(200).json({ message: 'Admin deleted ticket successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createTicket,
  getMyTickets,
  getMyTicketById,
  getTicketActivity,
  updateMyTicket,
  updateMyTicketStatus,
  deleteMyTicket,
  getAllTickets,
  getAnyTicketById,
  updateAnyTicket,
  updateAnyTicketStatus,
  deleteAnyTicket,
};