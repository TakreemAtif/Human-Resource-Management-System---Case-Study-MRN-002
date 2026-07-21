import JobCard from '../JobCard';
import api from '../../api/api.js';
import { useState, useEffect } from 'react';

function JobLayout() {
    const [jobData, setJobData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            setIsLoading(true);
            try {
                const res = await api('/job/job');
                // Access the data property depending on your API wrapper structure (e.g., res.data or res)
                setJobData(res.data.data || res);
                console.log(res) 
                console.log(res.data) 
                console.log(res.data.data) 
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJob();
    }, []); // Empty array ensures this runs only once on mount

    if (isLoading) { 
        return <>Loading...</>;
    }

    return (
        <>
            {/* Map through your jobData to render JobCards, or pass the array directly */}           
                <JobCard JobData={jobData[0]} />
        </>
    );
}

export default JobLayout;
