import { Typography } from '@mui/material';
import { HealthCheckProps } from '../../types';
import { MedicalServices, Favorite} from '@mui/icons-material';
import DiagnosisList from './DiagnosisList';

const HealthCheckEntry = ({ entry }: HealthCheckProps): JSX.Element => {
    const borderStyle = {
        border: "2px solid black",
        borderRadius: "5px",
        padding: "0.5em",
        marginBottom: "7px"
    };

    const fillColour = (): string => {
        switch (entry.healthCheckRating) {
            case 0:
                return 'green';
            case 1:
                return 'yellow';
            case 2:
                return 'orange';
            case 3:
                return 'red';
            default:
                return 'grey';
        }
    };

    return (
        <div style={borderStyle}>
            <Typography>{entry.date} <MedicalServices /></Typography>
            <Favorite sx={{ color: fillColour() }} />
            <Typography><em>{entry.description}</em></Typography>
            <Typography>diagnose by {entry.specialist}</Typography>
            <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        </div>
    );
};

export default HealthCheckEntry;