import Cache from 'wym-cache';
import config from '../conf/conf';

export default new Cache(config.cache.redisPort,config.cache.redisHost,config.cache.redisPwd);
