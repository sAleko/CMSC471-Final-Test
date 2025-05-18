# Invisible Aftershocks: COVID-19’s Mental Toll Across America

As we all know, COVID-19 was a global pandemic that affected people across the world. It led to the closure of schools, parks, restaurants, and many other public places for literally years, due to fear of spreading the virus. Only a small percentage of jobs—those deemed critical to the functioning of society—were allowed to continue, while others were forced to adapt or shut down entirely.

Since its spread to the United States in 2019, COVID-19 has claimed the lives of over a million people. The virus has impacted everyone in one way or another—whether through the loss of loved ones, jobs, or other hardships that are difficult to fully quantify.
One such hardship is the effect the pandemic had on the mental health of the American people. Unfortunately, mental health concerns were often pushed aside, as more immediate issues like death rates and unemployment took center stage. While some may not view mental health as essential, society is made up of individuals, and when individuals are affected, the larger population inevitably feels the consequences.

That is why we are going to take a deeper dive into this issue and explore how COVID-19 has affected the mental health of the U.S. population.

To do this, we will use an interactive graph that allows you to select people of various ages and backgrounds. The graph will display data on those who became depressed during the pandemic, those who continue to experience depression, and trends in mental health over time.

We are using a dataset from the Substance Abuse and Mental Health Services Administration. This dataset contains survey responses from individuals collected both before and after the COVID-19 pandemic. It includes data from hundreds of thousands of people.
The survey asked a simple question: whether or not the respondent was experiencing depression, with the only possible answers being "yes" or "no." While this limits the range of expression regarding people's mental health, it still provides valuable insight into their overall well-being.

The dataset also includes demographic information such as sex, age, ethnicity, income, and many other categories. However, due to the large number of variables, we chose to focus on the most common and relevant ones to avoid overwhelming the user and to keep the analysis clear and straightforward.

## Data

This visualization relies on the [National Survey on Drug Use and Health](https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health/datafiles), which is directed by the Substance Abuse and Mental health Services Administration, which is part of the U.S. Department of Health and Human Services. We collected the 2018-2023 datasets, which contain millions of data entries, and parsed out data that we thought would impact mental health.

From this dataset, we use the variables:

ADDPREV, or SEVERAL DAYS OR LNGR WHEN FELT SAD/EMPTY/DPRSD
* This variable was mapped to Depression

CATAGE, or RC-AGE CATEGORY
* This variable was mapped to Age Range

NEWRACE2, or RC-RACE/HISPANICITY RECODE (7 LEVELS)
* This variable was mapped to Ethnicity

HEALTH, or "Would you say your health in general is excellent, very good, good, fair, or poor"
* This variable was mapped to Bodily health

INCOME
* This variable was mapped to income range

IRSEX 
* This variable was mapped to sex

ANYHLTI2, or covered by health insurance
* This variable was mapped to Health Insurance

SERVICE, or have you served in the military?
* This variable was mapped to Military Service

All of the data in the datasets were weighted. Our project keeps these weights in mind when computing depression outcome rates.

## Running the Project
This project is built using JS, CSS, and HTML.
1. Download the github repository
2. Open the project in visual studio code
3. Run the project using VSCode Live Server

To recreate the datasets, you can use the `dataformatter.py` script.
1. Download python version 3.13
2. install Pandas via pip
3. Download all NSDUH datasets from years you want as tsv files
4. Ensure all datasets are named with the format `NSDUH_20XX_Tab.txt`
5. Run the python script

## Contributors
Aleko
- Created project base
- Made circles move
- Added group selector
- Linked group data to circles
- Bugfixes

Yuji
- Combined and cleaned data from 2018-2023 NSDUH datasets
- Implemented data group filtering
- Implemented weighted-percent tabulation
- Bugfixes
- Data and Running section of writeup

Luul
- Overview and Data section of writeup