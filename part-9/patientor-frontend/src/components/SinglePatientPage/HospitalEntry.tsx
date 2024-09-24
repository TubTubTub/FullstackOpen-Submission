import { Typography } from '@mui/material';
import { HospitalProps} from '../../types';
import { LocalHospital } from '@mui/icons-material';
import DiagnosisList from './DiagnosisList';

const HospitalEntry = ({ entry }: HospitalProps): JSX.Element => {
    const borderStyle = {
        border: "2px solid black",
        borderRadius: "5px",
        padding: "0.5em",
        marginBottom: "7px"
    };

    return (
        <div style={borderStyle}>
            <Typography>{entry.date} <LocalHospital /></Typography>
            <Typography><em>{entry.description}</em></Typography>
            <Typography>diagnose by {entry.specialist}</Typography>
            <DiagnosisList diagnosisCodes={entry.diagnosisCodes}/>
        </div>
    );
};

export default HospitalEntry;