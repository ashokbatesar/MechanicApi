const { getDate } = require('../helpers/common');

const express = require('express');
const fetch = require('node-fetch');


const NotificationsModel = require('../models/notificationsModel');


exports.sendNotification = async (params) => {

    const message = {
        to: params.expoPushToken,
        sound: 'default',
        title: params.title,
        body: params.body,
        data: { someData: params.someData },
        subtitle: "ashok" //visible after title
    };

    let noti = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });


    console.log(noti);

    if (noti.status == '200') {

        
        
        //NotificationsModel.addNotification()

        return noti.statusText
    } else {
        return "failure"
    }


}