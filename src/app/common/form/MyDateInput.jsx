import { useField, useFormikContext } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';
import { FormField } from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";
export default function MyDateInput({label, ...props}){
    const {setFieldValue} = useFormikContext();
    const [field,meta]  = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <DatePicker 
                {...field}
                {...props}
                selected={(field.value && new Date(field.value))}
                onChange={value=>setFieldValue(field.name,value)}
            />
            {meta.touched && meta.error ?(
                <label basic color='red'>{meta.error}</label>
            ): null}
        </FormField>

    )

}