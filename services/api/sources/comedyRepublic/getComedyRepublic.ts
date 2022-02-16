import axios from 'axios';
import { err, ifNotErrAsync, ifNotErr } from 'errable';
import reportError from '../../../reporting/reportError';
import {
  ComRepEvtRaw,
  ComRepEvtResponse,
  ComRepGuestToken,
  ComRepGuestTokenResponse,
} from './types';
import { ApiErrorOr } from '../../../../utils/api/ApiErrorOr';
import normaliseComedyRepublicEvent from './normaliseComedyRepublicEvent';
import { ComEvent } from '../../../events/types';
import catchErrors from '../../../../utils/api/catchErrors';

const makePayload = () => ({
  SaleSearch: {
    CrossSellId: 0,
    IncludePrivateItems: false,
    FromIndex: 0,
    ToIndex: 2000,
    EventFromIndex: 0,
    EventToIndex: 2000,
    VoucherFromIndex: 0,
    VoucherToIndex: 2000,
    ProductFromIndex: 0,
    ProductToIndex: 2000,
    CampaignFromIndex: 0,
    CampaignToIndex: 2000,
    MembershipFromIndex: 0,
    MembershipToIndex: 2000,
    DealDiscountToIndex: 2000,
    DealDiscountFromIndex: 0,
    SubPackageToIndex: 2000,
    SubPackageFromIndex: 0,
    FilterBy: '',
    ListingType: null,
    CategoryIds: [],
    VenueIds: [],
    DateRangeStart: null,
    DateRangeEnd: null,
    EventRange: '',
    FilterText: '',
    PriceRangeStart: null,
    PriceRangeEnd: null,
  },
});

const makeConfig = ({ guestToken }: { guestToken: ComRepGuestToken }) => ({
  headers: {
    Authorization: `Bearer ${guestToken.Token}`,
    'Content-Type': 'application/json',
  },
});

const getComedyRepublic = (cfg: {} = {}): Promise<ApiErrorOr<ComRepEvtRaw[]>> =>
  axios
    .get<ComRepGuestTokenResponse>(
      'https://api.ticketsearch.com/Auth/OnlineToken/GetGuestToken?orgCode=tccinc&guestId=',
    )
    .then(({ data }) => {
      if (data.Errors !== null) {
        const message = 'Error getting guest token for comedy republic';
        reportError(message);
        return err({ message, errors: data.Errors });
      } else if (!data.Result?.GuestToken) {
        const message = 'Guest token was not present for comedy republic';
        reportError(message);
        return err({ message, errors: data });
      }
      return data.Result?.GuestToken;
    })
    .then(
      ifNotErrAsync((guestToken) =>
        axios.post<ComRepEvtResponse>(
          'https://api.ticketsearch.com/OnlineApi/Sales/GetSaleEventList',
          makePayload(),
          makeConfig({ guestToken }),
        ),
      ),
    )
    .then(
      ifNotErr(({ data }) => {
        // todo: check data.Errors
        return data.Result?.SalesEventDetails || [];
      }),
    )
    .catch(catchErrors('Error getting sale events for comedy republic'));

export default getComedyRepublic;
