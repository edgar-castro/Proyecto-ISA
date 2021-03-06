import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import {
    CRCMiniContainer,
    CRCMiniList,
    CRCMiniSectionTitle,
    CRCMiniTitle
} from './CRCMiniElements';

const CRCMini = ({ id, name,fire, superClasses, subClasses, key, doc_name }) => {
  const history = useHistory();
  const goToCRC = () => {
    history.push({
      pathname: `/crc-card/${id}`, 
      state: {
          id: id,
          _new: false,
          doc_name:doc_name,
          fire:fire
      }
    });
  };
  
  return (
      <CRCMiniContainer onClick={goToCRC}>
            <CRCMiniTitle>{name}</CRCMiniTitle>
            <CRCMiniSectionTitle>Superclases:</CRCMiniSectionTitle>
            <CRCMiniList>{superClasses}</CRCMiniList>
            <CRCMiniSectionTitle>Subclases:</CRCMiniSectionTitle>
            <CRCMiniList>{subClasses}</CRCMiniList>
      </CRCMiniContainer>
  )
} 

export default CRCMini;