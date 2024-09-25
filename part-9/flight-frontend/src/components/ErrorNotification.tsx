import { ErrorNotificationProps } from '../types';

const ErrorNotification = ({ errorMessage }: ErrorNotificationProps): (JSX.Element | null) => {
    if (errorMessage === '') return null;

    return <p style={{ color: 'red' }}>{errorMessage}</p>;
};

export default ErrorNotification;