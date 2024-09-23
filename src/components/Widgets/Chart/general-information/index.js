import "react-perfect-scrollbar/dist/css/styles.css";
import '../../../../assets/css/scroll-bar.css';
import WidgetTitle from "../WidgetTitle";
import numeral from "numeral";

const postsAAPL = [
  {
    field: "Company Name",
    value: "",
  },
  {
    field: "Market Cap",
    value: "",
  },
  {
    field: "Exchange",
    value: "",
  },
  {
    field: "Sector",
    value: "",
  },
  {
    field: "Industry",
    value: "",
  },
  {
    field: "Number of Employees",
    value: "",
  },
  {
    field: "Next Earnings Date",
    value: "",
  },
  {
    field: "Last Annual Dividend",
    value: "",
  },
  {
    field: "Net Profit Margin TTM",
    value: "",
  },
  {
    field: "Country",
    value: "",
  },
  {
    field: "Website",
    value: "",
  },
];

const postsSpy = [
  {
    field: "Issuer",
    value: "SPDR",
  },
  {
    field: "Expense Ratio",
    value: ".65",
  },
  {
    field: "Inspection Date",
    value: "Dec 1, 2009",
  },
  {
    field: "AUM",
    value: "1,000,000",
  },
  {
    field: "Sector",
    value: "Technology",
  },
  {
    field: "Country",
    value: "United States",
  },
  {
    field: "Website",
    value: "Link",
  },
];

const postsFinance = [
  {
    field: "Price/Earnings",
    value: "",
  },
  {
    field: "Price/Earnings/Growth",
    value: "",
  },
  {
    field: "Price/Book",
    value: "",
  },
  {
    field: "Price/Sales",
    value: "",
  },
  {
    field: "Price/Free Cash Flow",
    value: "",
  },
  {
    field: "Cash Flow/Debt",
    value: "",
  },
  {
    field: "Debt/Equity",
    value: "",
  },
  {
    field: "Current Ratio",
    value: "",
  },
  {
    field: "Return On Capitol Employed",
    value: "",
  },
  {
    field: "Return On Equity",
    value: "",
  },
  {
    field: "Net Profit Margin",
    value: "",
  },
];

const getPosts = (type) => {
  switch (type) {
    case "spy":
      return postsSpy;
    case "finance":
      return postsFinance;
    case "aapl":
    default:
      return postsAAPL;
  }
};

const ScrollView = (childView) => {
  return <div>{childView}</div>;
};

function toFixedWithoutRounding(number, precision) {
  var multiplier = Math.pow(10, precision);
  var truncated = Math.floor(number * multiplier) / multiplier;
  return truncated.toFixed(precision);
}


const GeneralInformation = ({ title, desc, type = "aapl", companyData }) => {
  let posts = getPosts(type);
  const MAX_POSTS_FOR_PAGE = 10;

  if(type === "aapl" && companyData?.companyName) {
    posts.map((post, index) => {
      switch(post.field){
        case 'Company Name': 
          post.value = companyData.companyName
          break
        case 'Market Cap':
          post.value = numeral(companyData.mktCap).format('0.00a').toUpperCase()
          break
        case 'Exchange':
          post.value = companyData.exchangeShortName
          break
        case 'Sector':
          post.value = companyData.sector
          break
        case 'Industry':
          post.value = companyData.industry
          break
        case 'Number of Employees':
          post.value = numeral(companyData.fullTimeEmployees).format('0,0')
          break
        case 'Next Earnings Date':
          post.value = "TBD"
          break
        case 'Last Annual Dividend':
          post.value = `$${companyData.lastDiv} p/s`
          break
        case 'Net Profit Margin TTM':
          post.value = `${(companyData.netProfitMarginTTM)?.toFixed(2)} %`
          break
        case 'Country':
          post.value = companyData.country
          break
        case 'Website':
          post.value = (<a target="_blank" rel="noreferrer" href={companyData.website}>Link</a>)
          break
        default:
          return ''
      }
      return ''
    })
  }

  if(type === "finance" && companyData?.dividendYielTTM){
    posts.map(post => {
      switch (post.field) {
        case "Price/Earnings":
          post.value = toFixedWithoutRounding(companyData.priceEarningsRatioTTM, 2)
          break;
        case "Price/Earnings/Growth":
          post.value = toFixedWithoutRounding(companyData.priceEarningsToGrowthRatioTTM, 2)
          break;
        case "Price/Book":
          post.value = toFixedWithoutRounding(companyData.priceToBookRatioTTM, 2)
          break;
        case "Price/Sales":
          post.value = toFixedWithoutRounding(companyData.priceSalesRatioTTM, 2)
          break;
        case "Price/Free Cash Flow":
          post.value = toFixedWithoutRounding(companyData.priceToFreeCashFlowsRatioTTM, 2)
          break;
        case "Cash Flow/Debt":
          post.value = toFixedWithoutRounding(companyData.cashFlowToDebtRatioTTM, 2)
          break;
        case "Debt/Equity":
          post.value = toFixedWithoutRounding(companyData.debtEquityRatioTTM, 2)
          break;
        case "Current Ratio":
          post.value = toFixedWithoutRounding(companyData.currentRatioTTM, 2)
          break;
        case "Return On Capitol Employed":
          post.value = toFixedWithoutRounding(companyData.returnOnCapitalEmployedTTM, 2)
          break;
        case "Return On Equity":
          post.value = toFixedWithoutRounding(companyData.returnOnEquityTTM, 2)
          break;
        case "Net Profit Margin":
          post.value = toFixedWithoutRounding((companyData.netProfitMarginTTM * 100), 2)+ '%'
          break;
        default: 
          return ''
      }
      return ''
    })
  }
  const mainComponent = (
    <div className="flex flex-col gap-[2px] px-3.75 py-1.5 font-roboto">
        {posts.map((post, idx) => (
          <div
            className="flex justify-between gap-3 text-[17px] leading-5 font-normal"
            key={`info-${idx}`}
          >
            <span className="whitespace-nowrap flex-0">{post.field}</span>
            <span className="text-[#868BFF] truncate flex-1 text-right">{post.value}</span>
          </div>
        ))}
    </div>
  );

  const scrollable = posts.length > MAX_POSTS_FOR_PAGE;

  return (
    <>
      <div className="w-full"> 
        <WidgetTitle
          title={title}
        />
        {scrollable ? ScrollView(mainComponent) : mainComponent}
      </div>
    </>
  );
};

export default GeneralInformation;
