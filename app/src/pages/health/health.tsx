import React, { useEffect, useState } from 'react';
import { getHealthEntries } from '../../api/api'
import TitleBar from '../../components/TitleBar';

const HealthPage: React.FC = () => {
    const [healthDataEntryNum, setHealthDataEntryNum] = useState(0);

    useEffect(() => {
        const fetchHealthData = async () => {
            try {
                const response = await getHealthEntries();
                console.log(response);
                setHealthDataEntryNum(response.data.length);
            } catch (error) {
                console.error('Error fetching health data:', error);
            }
        };

        fetchHealthData();
    }, []);

    return (
        <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="notes-page">
        <h1 className="notes-title">Health Data</h1>
        <h1 className="notes-title">Number of data points: {healthDataEntryNum}</h1>
      </div>
    </div>
    );
};

export default HealthPage;