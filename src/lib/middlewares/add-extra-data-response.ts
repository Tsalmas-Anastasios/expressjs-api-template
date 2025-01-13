import { config } from '../../config';


export const addExtraDataToResponse = (response_body: any, statusCode: number): any => {

    const level_codes: {
        2: string;
        3: string;
        4: string;
        5: string;
    } = {
        2: 'success',
        3: 'info',
        4: 'warning',
        5: 'error'
    };



    const status_first_digit = Math.floor((statusCode || 500) / 100);
    const level_code = level_codes[status_first_digit];

    const additional_data = { level: level_code, application_details: config.application_details };
    if (response_body?.level)
        additional_data.level = response_body?.level;


    return {
        ...response_body,
        ...additional_data,
    };

};
