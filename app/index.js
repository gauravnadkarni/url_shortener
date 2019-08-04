import app from "./app";
import scheduler from './scheduler/index';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // Comment below code if you want to manually trigger moderate and status
    // calls for local development
    logger.info(`process.env.SHOULD_START_CRON : ${process.env.SHOULD_START_CRON}`);
    if (process.env.SHOULD_START_CRON && JSON.parse(process.env.SHOULD_START_CRON)) {
        scheduler.moderateSchedular();
        scheduler.statusSchedular();
        scheduler.engagementScheduler();
        scheduler.gdprStatuReportingSchedular();
        logger.info('-> UGC-Agent - CRON Schedulers Activated');
    }
    logger.info('-> UGC-Agent is now running on port 3000');
    cdocService.init();
    logger.info('CDOC service initialized');
});