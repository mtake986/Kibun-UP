<h1 align="center">Kibun UP</h1>

## 💻 Built With
<p style="display: inline">
  <img src="https://img.shields.io/badge/-javascript-20232A?style=for-the-badge&logo=javascript">
  <img src="https://img.shields.io/badge/-react-20232A?style=for-the-badge&logo=react">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-tailwindcss-20232A?style=for-the-badge&logo=tailwindcss">
  <img src="https://img.shields.io/badge/-firebase-20232A?style=for-the-badge&logo=firebase">
  <img src="https://img.shields.io/badge/-vercel-20232A?style=for-the-badge&logo=vercel">
</p>

## 💬 Abstract

This is an app to have users to keep their motivation to a specific target which users can set. I love the greatest quotes in the world and often read them to inspire myself to the target.

By the way, I created the appp name, "Kibun UP". I have been a college student in the U.S. since 2019. "Kibun" is a Japanese word means feeling or mood, and the sound likes 7 UP, a famous soda in the U.S. and "UP" is an English word.

## 🖼️ Screenshots of the App

### 1. Home Page

#### Feature: Refresh

The users can refresh the event/quote by clicking the refresh icon at the bottom-right position in the cards.

#### Feature: Locks

**Before locked**
Both of the target icons placed at right-bottom position in the cards are grayed out first. After users lock the event/quote, the icon for it will be colored in red. The users can lock the event/quote by clicking the target icons.
<img src="/public/AppScreenshots/home/HomePageBeforeLock.png" alt="Before locked" width='300' />

**After locked**
Once locked, the event/quote won't change until the users unlock them. The users can unlock them by clicking the target icons again.
<img src="/public/AppScreenshots/home/HomePageAfterLock.png" alt="After locked" width='300' />

### 2. Quotes Page

**List of Quotes of the User**
List of quotes a user have made under the "Mine" tab, and quotes other users have made under "All" tab.
In the card, users can
Edit -> the edit icon at the bottom-left position
Lock -> the lock icon at the bottom-left position
Heart -> number of likes to quotes from other users
Delete -> the trash icon at the bottom-right position
<img src="/public/appScreenshots/quote/ListOfQuotes.png" alt="My Quotes" width='300' />

**Regsiter Form of Quote**
Clicking the plus icon at the bottom-right position will display a regsiter form of a quote. Create a new quote by filling out the form. The form is validated by the following rules.
| Property | Rule |
|----------------|-----------------------|
| Person | 2 ~ 100 letters |
| Description | ~ 1000 letters |
| Draft | boolean |
| Tags | Max 5 tags, ~ 30 tags |

<img src="/public/appScreenshots/quote/QuoteRegisterForm.png" alt="Quote Register Page" width='300' />

**List of Quotes not mine**
Displaying quotes made by other users. The users can like the quotes by clicking the heart icon at the bottom-left position in the cards. The users can also bookmark the quotes by clicking the bookmark icon next to the heart icon. Bookmarks are displayed under the **Bookmarks** tab in the profile page and can be displayed on the homepage if users set on the profile page.
<img src="/public/appScreenshots/quote/ListOfQuotesNotMine.png" alt="List of Quotes not mine" width='300' />

**List of My Quotes when filtering is on**
The users can filter the quotes by tags and sort the list by these properties: quote, person, and the time created.
<img src="/public/appScreenshots/quote/QuoteWhenFilter.png" alt="List of My Quotes when filtering is on" width='300' />

### 3. Event Page

**List of Events**
List of events a user have made under the "Mine" tab. When creating, you can set a title of a event, a target date, and a target place, and a descreption.
In the card, users can
Edit -> the edit icon at the bottom-left position
Lock -> the lock icon at the bottom-left position
Delete -> the trash icon at the bottom-right position

<img src="/public/appScreenshots/event/ListOfEvents.png" alt="List of Events" width='300' />

**Register form of Event**

Users can create a new event by filling out the form. The form is validated by the following rules.
| Property | Rule |
|----------------|---------------------|
| Event Title | 2 ~ 100 letters |
| Place | ~ 50 letters |
| Description | ~ 500 letters |
| Event Date | Proper Date Format |

<img src="/public/appScreenshots/event/EventRegisterForm.png" alt="Register form of Event" width='300' />

### 4. User Profile

Displaying a list of things that belong to the current user. The users can edit their profile by clicking the edit icon at the top-right position in the profile section.

#### Feature: Customize number of things to display once

I implemented a pagination for the lists of events and quotes and the default number to display per page is 10. Users can customize the number of things to display once per page. So, 5 means 5 items per page.

Users can also edit their quotes and events from here.
Also, quotes that the login user bookmarked and quotes that the login user liked are displayed under the **Bookmarks** and **Likes** tabs.

<img src="/public/appScreenshots/profile/Profile1.png" alt="Profile Page 1" width='300' />

#### Feature: Customize the quote type to display on the homepage

My app allows users to customize the quote type to display on the homepage. The default is **Mine** which is a quote made by the current user displayed on the homepage. Other options are **Bookmarks** and **Inspiration**.

<img src="/public/appScreenshots/profile/Settings.png" alt="Settings" width='300' />

### 5. Contact Page

Users can reach out to the creator of the app by filling out the form. The form is validated by the following rules.
| Property | Rule |
|----------------|---------------------|
| Sender Name | 2 ~ 20 letters |
| Sender Email | proper email format |
| Title | 2 ~ 30 letters |
| Message | 2 ~ 1000 letters |

<img src="/public/appScreenshots/contact/ContactForm.png" alt="Contact Page" width='300' />

### 6. Creator Info.

Displaying the creator's information: Name, from country, tech stacks used in the application, resumes and transcripts, and SNS accounts of the creator.
<img src="/public/appScreenshots/creatorInfo/CreatorInfo.png" alt="Creator Info. Page" width='300' />

## 🔗 App Links

[Repository](https://github.com/mtake986/Kibun-UP)
[Application](https://kibun-up.vercel.app/)

## 😀 Creator

<div style="display: flex; gap: 20px">
  <img src="/public/creatorPicture.jpg" alt="Creator Picture" width='100' style="width: 100px; height: 100px; border-radius: 100%; object-position: center; object-fit: cover; "/>
  <div>
    <div>
      <span style="font-weight: 600;" >Masahiro Takechi</span>
      <p>Kochi, Japan (Japanese)</p>
    </div>
    <div style="display: flex; flex-direction: column;">
      <span style="font-weight: 600;" >Accounts</span>
      <div style="display: flex; gap: 10px">
        <a href='https://twitter.com/byui_masa'>
          <img src="/public/icons/twitter.svg" alt="Twitter icon" width='32' />
        </a>
        <a href='https://www.youtube.com/@byui-masa'>
          <img src="/public/icons/youtube.svg" alt="YouTube icon" width='32' />
        </a>
        <a href='https://github.com/mtake986'>
          <img src="/public/icons/github.svg" alt="GitHub icon" width='32' />
        </a>
      </div>
    </div>
  </div>
</div>

## 🤝 Support

Contributions, issues, and feature requests are welcome!
Give a ⭐️ if you like this project!

<a href="https://www.buymeacoffee.com/masahirotakechi" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
