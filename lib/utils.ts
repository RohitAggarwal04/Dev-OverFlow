import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getTimeAgo = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day; // Assuming a month has approximately 30 days
  const year = 365 * day; // Assuming a year has approximately 365 days

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / second);
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

export const formatBigNumber = (num: number | string): string => {
  const numericValue = typeof num === "string" ? parseFloat(num) : num;

  if (numericValue >= 1e6) {
    return (numericValue / 1e6).toFixed(1) + "M";
  } else if (numericValue >= 1e3) {
    return (numericValue / 1e3).toFixed(1) + "K";
  } else {
    return numericValue?.toString();
  }
};
export const getJoinededDate = (dateObject: Date): string => {
  // Get month and year from the Date object
  const month = dateObject.toLocaleString("default", { month: "long" });
  const year = dateObject.getFullYear();

  // Join the month and year
  const formattedDate = `Joined ${month} ${year}`;

  return formattedDate;
};

interface UrlQueryParams {
  value: string | null;
  key: string;
  params: string;
}
export const formUrlQuery = ({ value, key, params }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    { query: currentUrl, url: window.location.pathname },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  keysToRemove: string[];
  params: string;
}
export const removeKeysFromQuery = ({
  keysToRemove,
  params,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    { query: currentUrl, url: window.location.pathname },
    { skipNull: true }
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}
export const assignBadges = (params: BadgeParam) => {
  const BadgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };
  const { criteria } = params;
  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];
    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        BadgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });
  return BadgeCounts;
};

interface Props {
  query: string;
  filter: string | undefined;
  page: number;
}
export const jobsParams = async ({ query, filter, page }: Props) => {
  const [countriesResponse, locationResponse] = await Promise.all([
    fetch("https://restcountries.com/v3.1/all?fields=name,flags"),
    fetch("http://ip-api.com/json"),
  ]);

  const userLocation = await locationResponse.json();
  const countriesData = await countriesResponse.json();
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs`,
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       searchQuery: query,
  //       filter: filter || userLocation.country,
  //       page: page,
  //     }),
  //   }
  // );
  // const responseData = await response.json();
  const data = [
    {
      employer_name: "Royal Bank of Canada",
      employer_logo:
        "https://www.rbc.com/en/wp-content/themes/rbc/img/logos/rbc-logo-shield-blue.svg",
      employer_website: "http://www.rbc.com",
      employer_company_type: "Finance",
      job_publisher: "RBC Careers",
      job_id: "xNKn3-VL2QHYeLLQAAAAAA==",
      job_employment_type: "FULLTIME",
      job_title: "Machine Learning_Software Engineer",
      job_apply_link:
        "https://jobs.rbc.com/ca/en/job/R-0000078705/Machine-Learning-Software-Engineer",
      job_apply_is_direct: false,
      job_apply_quality_score: 0.6874,
      apply_options: [
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
      ],
      job_description:
        "Job Summary\n" +
        "\n" +
        "Job Description\n" +
        "\n" +
        "The Trusted Data & AI team is a looking for an ambitious software developer to join our team and help enable solutions around Data Privacy and Trust in AI Model training and beyond at RBC. You will be working a team of talented developers and data scientists on solutions such as our Synthetic Data Generation service that uses AI models to generate statistically accurate synthetic data based on real data samples. You will be working with large data sets, building microservices, enabling data workflows with Airflow, setting up and managing deployment pipelines and working directly on enhancements to existing services.\n" +
        "\n" +
        "WHAT WILL YOU DO?\n" +
        "Participate in the design and implementation of software solutions for the Trusted Data & AI team, building microservices, enabling data pipelines, writing re-useable frameworks, working directly with the other software developers and data scientists on the team to solution services such as Synthetic Data Generation.\n" +
        "• Take part in normal Engineering scrum ceremonies (stand-up, sprint planning, story grooming etc) and participate on quarterly PI planning with the Cloud Data Platform Delivery Train.\n" +
        "• Take responsibility for a set of engineering stories to completion each sprint.\n" +
        "• Work with the engineering team on design initiatives, POCs, technology evaluations\n" +
        "• Review code Pull Requests to ensure the quality of deployed\n" +
        "\n" +
        "WHAT DO YOU NEED TO SUCCEED?\n" +
        "Must have:\n" +
        "• Undergraduate degree coupled with proven software development experience.\n" +
        "• Demonstrated excellence in written and oral communication skills including strong presentation skills. Ability to determine the information and communication needs of the stakeholders and project.\n" +
        "• Strong organizational, project management and time management capabilities.\n" +
        "• A strong understanding of technology and/or financial services industry.\n" +
        "• Deadline-driven and results-oriented; able to meet consistently high- quality standards while handling a variety of tasks and deadlines simultaneously.\n" +
        "• Experience with statistics, data science and processing large data sets\n" +
        "• Experience/familiarity with AI model training, AI model enablement in software development.\n" +
        "\n" +
        "Nice-to-have:\n" +
        "• Experience with Python, Postgres, Redis, Airflow, Cloud technologies (AWS, Azure)\n" +
        "• Experience with secure engineering practices\n" +
        "• Experience with performance tuning, systems and services\n" +
        "• Experience with prompt engineering and Large Language Models\n" +
        "• Experience with setting up and maintaining deployment pipelines (CI/CD)\n" +
        "• Experience with Agile Software Development Methodologies\n" +
        "\n" +
        "What’s in it for you?\n" +
        "\n" +
        "We thrive on the challenge to be our best, progressive thinking to keep growing, and working together to deliver trusted advice to help our clients thrive and communities prosper. We care about each other, reaching our potential, making a difference to our communities, and achieving success that is mutual.\n" +
        "• A comprehensive Total Rewards Program including bonuses and flexible benefits, competitive compensation, commissions, and stock where applicable\n" +
        "• Leaders who support your development through coaching and managing opportunities\n" +
        "• Ability to make a difference and lasting impact\n" +
        "• Work in a dynamic, collaborative, progressive, and high-performing team\n" +
        "• A world-class training program in financial services\n" +
        "• Flexible work/life balance options\n" +
        "• Opportunities to do challenging work\n" +
        "\n" +
        "#LI-Hybrid\n" +
        "\n" +
        "#TECHPJ\n" +
        "\n" +
        "Job Skills\n" +
        "Big Data Management, Data Mining, Data Science, Deep Learning, Machine Learning, Predictive Analytics, Programming Languages\n" +
        "\n" +
        "Additional Job Details\n" +
        "\n" +
        "Address:\n" +
        "\n" +
        "RBC WATERPARK PLACE, 88 QUEENS QUAY W:TORONTO\n" +
        "\n" +
        "City:\n" +
        "\n" +
        "TORONTO\n" +
        "\n" +
        "Country:\n" +
        "\n" +
        "Canada\n" +
        "\n" +
        "Work hours/week:\n" +
        "\n" +
        "37.5\n" +
        "\n" +
        "Employment Type:\n" +
        "\n" +
        "Full time\n" +
        "\n" +
        "Platform:\n" +
        "\n" +
        "Technology and Operations\n" +
        "\n" +
        "Job Type:\n" +
        "\n" +
        "Regular\n" +
        "\n" +
        "Pay Type:\n" +
        "\n" +
        "Salaried\n" +
        "\n" +
        "Posted Date:\n" +
        "\n" +
        "2024-02-09\n" +
        "\n" +
        "Application Deadline:\n" +
        "\n" +
        "2024-02-13\n" +
        "\n" +
        "Inclusion and Equal Opportunity Employment\n" +
        "\n" +
        "At RBC, we embrace diversity and inclusion for innovation and growth. We are committed to building inclusive teams and an equitable workplace for our employees to bring their true selves to work. We are taking actions to tackle issues of inequity and systemic bias to support our diverse talent, clients and communities.\n" +
        "​​​​​​​\n" +
        "We also strive to provide an accessible candidate experience for our prospective employees with different abilities. Please let us know if you need any accommodations during the recruitment process.\n" +
        "\n" +
        "Join our Talent Community\n" +
        "\n" +
        "Stay in-the-know about great career opportunities at RBC. Sign up and get customized info on our latest jobs, career tips and Recruitment events that matter to you.\n" +
        "\n" +
        "Expand your limits and create a new future together at RBC. Find out how we use our passion and drive to enhance the well-being of our clients and communities at jobs.rbc.com.",
      job_is_remote: false,
      job_posted_at_timestamp: 1707523200,
      job_posted_at_datetime_utc: "2024-02-10T00:00:00.000Z",
      job_city: "Toronto",
      job_state: "ON",
      job_country: "CA",
      job_latitude: 43.653225,
      job_longitude: -79.38319,
      job_benefits: null,
      job_google_link:
        "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=developer+in+canada&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=developer+in+canada&htidocid=xNKn3-VL2QHYeLLQAAAAAA%3D%3D",
      job_offer_expiration_datetime_utc: null,
      job_offer_expiration_timestamp: null,
      job_required_experience: {
        no_experience_required: false,
        required_experience_in_months: null,
        experience_mentioned: true,
        experience_preferred: false,
      },
      job_required_skills: null,
      job_required_education: {
        postgraduate_degree: false,
        professional_certification: false,
        high_school: false,
        associates_degree: false,
        bachelors_degree: false,
        degree_mentioned: true,
        degree_preferred: false,
        professional_certification_mentioned: false,
      },
      job_experience_in_place_of_education: false,
      job_min_salary: null,
      job_max_salary: null,
      job_salary_currency: null,
      job_salary_period: null,
      job_highlights: {},
      job_job_title: "Engineer",
      job_posting_language: "en",
      job_onet_soc: "15111100",
      job_onet_job_zone: "5",
      job_occupational_categories: ["Other"],
      job_naics_code: "522110",
      job_naics_name: "Commercial Banking",
    },
  ];

  const countriesFilter = countriesData.map(
    (country: { name: { common: any }; flags: { png: any } }) => ({
      name: country.name.common,
      flags: country.flags.png,
      value: country.name.common,
    })
  );

  const filteredLocation = countriesFilter.filter((location: any) =>
    location.name
      .toLowerCase()
      .includes(filter || userLocation.country.toLowerCase())
  );

  const flagUrl = filteredLocation[0]?.flags;
  return { flagUrl, countriesFilter, data };
};
