import axios from 'axios';
import { err, ifNotErrAsync, ifNotErr } from 'errable';
import reportError from '../../../reporting/reportError';
import { ComRepEvtResponse, ComRepGuestToken, ComRepGuestTokenResponse } from './types';
import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import normaliseComedyRepublicEvents from './normaliseComedyRepublicEvents';
import { ComEvent } from '../../../events/types';

const makePayload =() => ({
  "SaleSearch": {
    "CrossSellId": 0,
    "IncludePrivateItems": false,
    "FromIndex": 0,
    "ToIndex": 2000,
    "EventFromIndex": 0,
    "EventToIndex": 2000,
    "VoucherFromIndex": 0,
    "VoucherToIndex": 2000,
    "ProductFromIndex": 0,
    "ProductToIndex": 2000,
    "CampaignFromIndex": 0,
    "CampaignToIndex": 2000,
    "MembershipFromIndex": 0,
    "MembershipToIndex": 2000,
    "DealDiscountToIndex": 2000,
    "DealDiscountFromIndex": 0,
    "SubPackageToIndex": 2000,
    "SubPackageFromIndex": 0,
    "FilterBy": "",
    "ListingType": null,
    "CategoryIds": [],
    "VenueIds": [],
    "DateRangeStart": null,
    "DateRangeEnd": null,
    "EventRange": "",
    "FilterText": "",
    "PriceRangeStart": null,
    "PriceRangeEnd": null
  }
})

const makeConfig = ({ guestToken }: { guestToken: ComRepGuestToken}) => ({
  headers: {
    Authorization: `Bearer ${guestToken.Token}`,
    'Content-Type': 'application/json',

  }
})

const getComedyRepublic = (cfg: {} = {}): Promise<ApiErrorOr<ComEvent[]>> =>
  axios.get<ComRepGuestTokenResponse>('https://api.ticketsearch.com/Auth/OnlineToken/GetGuestToken?orgCode=tccinc&guestId=')
    .then(({ data }): ApiErrorOr<any> => {
      if (data.Errors !== null) {
        return err({ message: 'Error getting guest token for comedy republic', errors: data.Errors })
      } else if (!data.Result?.GuestToken) {
        return err({ message: 'Guest token was not present for comedy republic', errors: data })
      }
      return data.Result?.GuestToken;
    })
    .then(ifNotErrAsync((guestToken) =>
      axios.post<ComRepEvtResponse>('https://api.ticketsearch.com/OnlineApi/Sales/GetSaleEventList',
        makePayload(),
        makeConfig({ guestToken }),
      )))
    .then(ifNotErr(({ data }) => {
      // check data.Errors
      return normaliseComedyRepublicEvents(data.Result?.SalesEventDetails || [])
    })).catch(e => {
      reportError('Error getting sale events for comedy republic');
      return err({ message: 'Error getting sale events for comedy republic', e })
  });

export default getComedyRepublic;
