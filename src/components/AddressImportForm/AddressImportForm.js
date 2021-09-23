import React, { useContext, useEffect, useState} from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import web3 from '../../api/web3';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { useStyles } from './styles';

import Field from './Field';
import AddressesSelect from '../AddressesSelect/AddressesSelect';

export default function AddressImportForm({rebuildContent}) {
    const classes = useStyles();
    const [address, setAddress] = useState({ selected: true });
    const [newAddresess, setNewAddresses] = useState([])
    const { showSnackbar } = useContext(SnackbarContext);

    const handleInputChange = (name, value) => {

        setAddress((result) => {
            return {...result, [name]: value}
        });

    };

    const addNewAddress = () => {

        if(canSaveAddress(address)) {
            setNewAddresses(
                [ ...newAddresess, address ]
            );
            showSnackbar('success', 'Leeroy Jenkins!');

        } else {
            showSnackbar('error', 'Name or address are not correct or duplicated!');
        }
    };
    

    const canSaveAddress = (data) => {
        let duplicate = 
            newAddresess.map(item => item.name).includes(data.name) ||
            newAddresess.map(item => item.address).includes(data.address?.toLowerCase());
        let addressValid = web3.isAddressValid(data.address);

        return !duplicate && addressValid && data.name.length;
    }

    const onUpdate = (result) => {
        setNewAddresses(result);
    };

    useEffect( () => {
        if(rebuildContent) rebuildContent(
            newAddresess.filter(item => item.selected).map(item => item.address)
        );
    }, [newAddresess]);

    return (
        <Grid container spacing={2} style={{marginBottom: 12}}>
            <Grid item xs={12}>
                <Typography variant={'body1'}>Fill up to 10 addresses</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4} >
                <AddressesSelect
                    {
                        ...{ onUpdate, newAddresess }
                    }
                    placeholder='Choose Addresses'
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
                <Field type='name' value={address.name} handleInputChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
                <Field type='address' value={address.address} handleInputChange={handleInputChange} />
            </Grid>
            <Grid item md={2}>
                <Button
                    className={classes.fieldsButton}
                    // disabled={addresses.length > 9}
                    variant={'outlined'}
                    color={'primary'}
                    fullWidth
                    onClick={addNewAddress}
                >
                    Save address
                </Button>
            </Grid>
        </Grid>
    )
}