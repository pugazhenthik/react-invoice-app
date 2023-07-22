import { Store } from 'react-notifications-component';

export default function notify(action, type = 'success') {
    let title = 'Server Error';
    let message = 'Something went wrong!';

    switch (type) {
        case 'success':
            title = 'Success';
            message = 'Record ' + action + ' successfully!';
            break;
        case 'danger':
            title = 'Error';
            message = 'Record not ' + action + '!';
            break;
    }

    Store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: false
        }
    });
}