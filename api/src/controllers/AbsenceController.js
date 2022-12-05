import { param, validationResult } from 'express-validator';
import logger from '../logger.js';
import { ErrorResponse } from '../response.js';
import absences from '../../json_files/absences.json' assert { type: "json" };
import members from '../../json_files/members.json' assert { type: "json" };


const getAbsences = (request, response, next) => {
  try {
    const populatedAbsences = absences.payload.map(absence => {
      const member = members.payload.find(member => member.userId === absence.userId);
      return { ...absence, memberName: member?.name };
    });
    return response.json({ ...absences, payload: populatedAbsences });
  } catch(err) {
    next(err);
  }
};

const getAbsenceById = (request, response, next) => {
  try {
    logger.info("getAbsenceById: " + request.params.id);
    const errors = validationResult(request); 

    if (!errors.isEmpty()) {
      logger.error("getAbsenceById validation errors: ", errors);
      return response.status(422).json(new ErrorResponse({ message: 'Fetch Absence Failed', content: errors.array() }));
    }

    const absence = absences.payload.filter((absence) => absence.id === Number(request.params.id))[0];
    logger.debug("getAbsenceById absence: ", absence);

    return response.json(absence);
  } catch(err) {
    next(err);
  }
};

const validate = (method) => {
  switch (method) {
    case 'getAbsenceById': {
      return param('id').exists().isInt()  
    }
  }
}

export default {
  getAbsences,
  getAbsenceById,
  validate
};