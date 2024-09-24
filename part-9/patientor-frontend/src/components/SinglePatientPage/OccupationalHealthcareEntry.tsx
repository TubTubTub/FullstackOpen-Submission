import { Typography } from '@mui/material';
import { OccupationalProps } from '../../types';
import { Work } from '@mui/icons-material';
import DiagnosisList from './DiagnosisList';

const OccupationalHealthcareEntry = ({ entry }: OccupationalProps): JSX.Element => {
    const borderStyle = {
        border: "2px solid black",
        borderRadius: "5px",
        padding: "0.5em",
        marginBottom: "7px"
    };

    return (
        <div style={borderStyle}>
            <Typography>{entry.date} <Work /> <i>{entry.employerName}</i></Typography>
            <Typography><em>{entry.description}</em></Typography>
            <Typography>diagnose by {entry.specialist}</Typography>
            <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        </div>
    );
};

export default OccupationalHealthcareEntry;