import schedule from 'node-schedule';
import config from 'config';
import fetch from 'node-fetch';
import parseFetch from '../utils/parseFetch';
import logger from '../utils/logger';

const keyGenerationScheduler = () => schedule.scheduleJob(config.CRON.keyGenerator, () => {

});

export default {
    keyGenerationScheduler
};