import React, { ReactElement, FC, useState } from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { InputAdornment } from '@mui/material';
import {  getBreweriesByCities } from '../../services/brewery.service';

interface ISearchProps {
    searchValues: string;
    setSearchValues: (val: any) => void;
    setData: (val: any) => void;
}


const  MyFormHelperText = () : ReactElement => {
    const { focused,  } = useFormControl() || {}; 
    const helperText = React.useMemo(() => {
    
        if (focused) {
        return 'This field is being filled';
     }
 
     return 'Helper text';
    }, [focused]);
      
        return <FormHelperText>{helperText}</FormHelperText>;
}

const Search : FC<ISearchProps> = ({setSearchValues, searchValues, setData})  =>  {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchValues(event.target.value); 
}

  const onPressHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    ;
    if(event.key == "Enter"){
        event.preventDefault();
        const data = await getBreweriesByCities(searchValues);
        setData(data);
    }
    
  }

  return (
    <Box component="form" noValidate autoComplete="off">
    <FormControl sx={{ width: '85.5ch' }}>
      <OutlinedInput  startAdornment={
        <InputAdornment position='start'>
            <LocationOnIcon />
        </InputAdornment>
      }
      placeholder="Enter your Location" value={searchValues} onChange={onChangeHandler} onKeyPress={onPressHandler}/>
      <MyFormHelperText />
    </FormControl>
  </Box>
  )
}

export default Search