import React, { useRef, useState, useEffect } from 'react'
import { 
    ChipBtn,
    ChipContainer,
    ChipName,
    MultiSelectContainer,
    MultiSelectData,
    MultiSelectIcon,
    MultiSelectInput,
    MultiSelectPlaceholder,
    MultiSelectSelect,
    OpenButton
} from './MultiSelectElements';

import { FiX } from 'react-icons/fi';

const MultiSelect = ({ options, canEdit, handleSelected, value, reverse, placeholder, max }) => {

    const [isOpen , setOpen] = useState(false);
    const [availableOptions, setAvailableOptions] = useState([...options]);
    const [chips, setChips] = useState([]);

    useEffect(()=>{
        if(value) setChips(value);
    },[])

    const handleSelectChange = e => {
        let values = [...e.target.selectedOptions].map( opt => opt.value);
        const newChips = Array.from(new Set([...values, ...chips]));
        setChips([...newChips]);
        handleSelected(newChips);
    }

    const handleRemoveChip = (chipToRemove) => {
        const newChips = chips.filter( e =>  e !== chipToRemove);
        setChips([...newChips]);
        handleSelected(newChips);
    }

    const handleCloseSelect = () => setOpen(false);
    const toggleOpen = () => setOpen(!isOpen);

    const selectorContainer = useRef(null);
    document.onclick = e => {
        if(selectorContainer?.current) {
            const isClickInside = selectorContainer.current.contains(e.target);
            if(!isClickInside){
                handleCloseSelect();
            }
        }
    }

    return (
    <MultiSelectContainer ref={selectorContainer} >
        <MultiSelectInput>
            { chips.length === 0 && (<MultiSelectPlaceholder>{placeholder}</MultiSelectPlaceholder>)}
            <MultiSelectData>
                {chips.map(e => 
                    <ChipContainer canEdit={canEdit} key={e}>
                        <ChipName>{e}</ChipName>
                        <ChipBtn canEdit={canEdit} onClick={() => handleRemoveChip(e)}>
                            <FiX />
                        </ChipBtn>
                    </ChipContainer>
                )}
            </MultiSelectData>
            <OpenButton canEdit={canEdit} onClick={toggleOpen} reverse={reverse}>
                <MultiSelectIcon open={isOpen}/>
            </OpenButton>
            
        </MultiSelectInput>
        <MultiSelectSelect className={isOpen ? "open" : "closed"} 
            multiple="multiple"
            onChange={handleSelectChange}
            size={2}
            reverse={reverse}
            placeholder={placeholder}
        >
            {availableOptions.map(option => 
                <option key={option} disabled={chips.includes(option) || max ? chips.length >= max : false }>
                    {option}
                </option>
            )};
        </MultiSelectSelect>
    </MultiSelectContainer>
  );
};


export default MultiSelect;