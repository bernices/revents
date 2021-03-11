import { useField } from 'formik';
import React from 'react';
import { FormField } from 'semantic-ui-react';

export default function MyTextInput({label, ...props}){
    const [field,meta]  = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <input {...field}{...props}/>
            {meta.touched && meta.error ?(
                <label basic color='red'>{meta.error}</label>
            ): null}
        </FormField>

    )

}