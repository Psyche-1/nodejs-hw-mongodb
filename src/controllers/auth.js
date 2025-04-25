import createHttpError from 'http-errors';
import {
  loginUser,
  registerUser,
  refreshUser,
  logoutUser,
  verifyUser,
} from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  const { name, email, _id, createdAt, updatedAt } = await registerUser(
    req.body,
  );

  res.status(201).json({
    status: 201,
    message: 'Successfully register a user!',
    data: { name, email, _id, createdAt, updatedAt },
  });
};

export const verifyController = async (req, res) => {
  await verifyUser(req.query.token);

  res.json({
    message: 'Email verified!',
  });
};

export const loginController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const session = await refreshUser(req.cookies);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  } else {
    throw createHttpError(401, 'Session not found');
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
