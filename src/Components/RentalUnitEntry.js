import React, { Fragment } from 'react';
import { Label, Input } from 'reactstrap';

function Unit({ monthlyRent, unitNumber, vacancy, bedrooms, bathrooms, annualTotal }) {
    return (
        <Fragment>
            <br />
            <Label> Montly Rent <Input type="text" value={monthlyRent} /> </Label>
            <Label> Unit # <Input type="text" value={unitNumber} /> </Label>
            <Label> Vacancy <Input type="text" value={vacancy} /> </Label>
            <Label> Bedrooms <Input type="text" value={bedrooms} /> </Label>
            <Label> Bathrooms <Input type="text" value={bathrooms} /> </Label>
            <Label> Annual Total <Input type="text" value={annualTotal} /> </Label>
        </Fragment>
    );
}

export default Unit;
