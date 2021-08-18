import {GetTickerResponse} from './ticker.types';
import agent from '../agent';

export class TickerAPI {
  // Если нужно, чтобы что-то пошло не так
  public getUnstableTicker = (): Promise<GetTickerResponse> => {
    const results = [
      agent.get<GetTickerResponse>('/public?command=returnTicker'),
      Promise.reject(Error('что-то пошло не так'))
    ];
    return results[Math.round(Math.random())];
  };

  public getTicker = (): Promise<GetTickerResponse> =>
    agent.get<GetTickerResponse>('/public?command=returnTicker');
}

export default new TickerAPI();
