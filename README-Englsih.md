![Logo](./public/icons/logo.png)

> 🚨 This is a README file in English.
> A Japanese Version of the Readme is [here](./README.md).
>
> 🚨 これは英語版 README です。
> 日本語版 README は[こちら](./README.md)です。

<br>

## 🔗 App URL

For those who just want to try the app right now
https://kibun-up.vercel.app

<br>

## 💬 Abstract

I LOVE the greatest quotes in the world and often read them to inspire myself to push myself hard to the goals in my life. Categories of the quotes I love vary from Steve Jobs and Albert Einstein to Japanese anime characters. There are some apps out there currently to display quotes somehow, but none of them satisfies all of my desires. So, I created this app, "Kibun UP".

Users can do these ⭐️ things in this app:

- **to create/add their own quotes** or whatever the kinds of quotes.
- to display a quote and event they like to see **by locking them**
- or display **a random quote and event** if not locked.
- to be able to **choose which a random quote comes from:**
  1. quotes made by the user
  2. quotes that the user bookmarked
  3. or quotes through the Internet.
- **to bookmark quotes** they like to see later
- **to keep their motivation** to a specific target which users can set (motivation!! most important!!)

"Kibun" is a Japanese word meaning feeling or mood, and I love 7 UP, a famous soda in the U.S.

<br>

## 💻 Tech Stacks

<p style="display: inline">
  <img src="https://img.shields.io/badge/-javascript-20232A?style=for-the-badge&logo=javascript">
  <img src="https://img.shields.io/badge/-typescript-20232A?style=for-the-badge&logo=typescript">
  <img src="https://img.shields.io/badge/-react-20232A?style=for-the-badge&logo=react">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-tailwindcss-20232A?style=for-the-badge&logo=tailwindcss">
  <img src="https://img.shields.io/badge/-firebase-20232A?style=for-the-badge&logo=firebase">
  <img src="https://img.shields.io/badge/-vercel-20232A?style=for-the-badge&logo=vercel">
</p>

<br>

## 🖼️ Screenshots of the App

### Brief Overview

| [Home](https://kibun-up.vercel.app/)                        | [After Locked](https://kibun-up.vercel.app/)                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------ |
| ![Home](/public/appScreenshots/home/HomePageBeforeLock.png) | ![After Locked](/public/appScreenshots/home/HomePageAfterLock.png) |
| Home main page, an event and a quote                        | After locked both an event and quote (red target icons)            |

<div class="table-wrapper" markdown="block">

| [List Of Quotes](https://kibun-up.vercel.app/quote)          | [List Of Quotes Not Mine](https://kibun-up.vercel.app/quote)             | [Quote When Filter Is On](https://kibun-up.vercel.app/quote)            | [Quote Register Form](https://kibun-up.vercel.app/quote/register)     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ![List Of Quotes](/public/appScreenshots/quote/ListMine.png) | ![List Of Quotes Not Mine](/public/appScreenshots/quote/ListNotMine.png) | ![Quote When Filter Is On](/public/appScreenshots/quote/WhenFilter.png) | ![Quote Register Form](/public/appScreenshots/quote/RegisterForm.png) |
| List of quotes which current user has created                | List of Quotes other users have made                                     | List of quotes which current user has created                           | List of Quotes other users have made                                  |

</div>

| [List Of Events ](https://kibun-up.vercel.app/event)     | [Event Regsiter Form](https://kibun-up.vercel.app/event/register)     |
| -------------------------------------------------------- | --------------------------------------------------------------------- |
| ![List Of Events](/public/appScreenshots/event/List.png) | ![Event Regsiter Form](/public/appScreenshots/event/RegisterForm.png) |
| List of quotes which current user has created            | List of Quotes other users have made                                  |

| [Profile Top](https://kibun-up.vercel.app/user/profile/[uid]) | [Settings](https://kibun-up.vercel.app/user/profile/[uid]) |
| ------------------------------------------------------------- | ---------------------------------------------------------- |
| ![Profile Top](/public/appScreenshots/profile/ProfileTop.png) | ![Settings](/public/appScreenshots/profile/Settings.png)   |
| List of quotes which current user has created                 | List of Quotes other users have made                       |

| Login                                            |
| ------------------------------------------------ |
| ![Login](/public/appScreenshots/login/Login.png) |
| Only google accounts allowed (Update coming!!)   |

| [Contact](https://kibun-up.vercel.app/contact)                       | [Creator Info](https://kibun-up.vercel.app/creator-info)                              |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ![Contact via Email](/public/appScreenshots/contact/ContactForm.png) | ![Creator Info](/public/appScreenshots/creatorInfo/CreatorInfo.png)                   |
| Able for users to shoot me an email directly!!                       | Creator Info, tech stacks of the app, resumes, transcripts, and social media accounts |

<br>

### Detailed Overview

### 1. Home Page

#### Feature: Refresh

The users can refresh the event/quote by clicking the refresh icon at the bottom-right position in the cards.

#### Feature: Locks

**Before locked**
Both of the target icons placed at right-bottom position in the cards are grayed out first. After users lock the event/quote, the icon for it will be colored in red. The users can lock the event/quote by clicking the target icons.

**After locked**
Once locked, the event/quote won't change until the users unlock them. The users can unlock them by clicking the target icons again.

### 2. Quotes Page

**List of Quotes of the User**
List of quotes a user have made under the "Mine" tab, and quotes other users have made under "All" tab.
In the card, users can
Edit: the edit icon at the bottom-left position
Lock: the lock icon at the bottom-left position
Heart: number of likes to quotes from other users
Delete: the trash icon at the bottom-right position

**Regsiter Form of Quote**
Clicking the plus icon at the bottom-right position will display a regsiter form of a quote. Create a new quote by filling out the form. The form is validated by the following rules.
| Property | Rule |
|-------------|------------------------- |
| Person | 2 ~ 100 letters |
| Description | ~ 1000 letters |
| Draft | Boolean |
| Tags | Max 5 tags, ~ 30 letters |

**List of Quotes not mine**
Displaying quotes made by other users. The users can like the quotes by clicking the heart icon at the bottom-left position in the cards. The users can also bookmark the quotes by clicking the bookmark icon next to the heart icon. Bookmarks are displayed under the **Bookmarks** tab in the profile page and can be displayed on the homepage if users set on the profile page.

**List of My Quotes when filtering is on**
The users can filter the quotes by tags and sort the list by these properties: quote, person, and the time created.

### 3. Event Page

**List of Events**
List of events a user have made under the "Mine" tab. When creating, you can set a title of a event, a target date, and a target place, and a descreption.
In the card, users can
Edit: the edit icon at the bottom-left position
Lock: the lock icon at the bottom-left position
Delete: the trash icon at the bottom-right position

**Register form of Event**

Users can create a new event by filling out the form. The form is validated by the following rules.
| Property | Rule |
|-------------|--------------------|
| Event Title | 2 ~ 100 letters |
| Place | ~ 50 letters |
| Description | ~ 500 letters |
| Event Date | Proper Date Format |

### 4. User Profile

Displaying a list of things that belong to the current user. The users can edit their profile by clicking the edit icon at the top-right position in the profile section.

#### Feature: Customize number of things to display once

I implemented a pagination for the lists of events and quotes and the default number to display per page is 10. Users can customize the number of things to display once per page. So, 5 means 5 items per page.

Users can also edit their quotes and events from here.
Also, quotes that the login user bookmarked and quotes that the login user liked are displayed under the **Bookmarks** and **Likes** tabs.

#### Feature: Customize the quote type to display on the homepage

The default is **Mine** which means a quote displayed on the homepage is only from the quotes that the current user has made. Other options are **Bookmarks** and **Random**. If **Bookmarks** is selected, a quote displayed on the homepage is only from the quotes that the current user has bookmarked. If **Random** is selected, a quote displayed on the homepage is from the Internet (app choice).

### 5. Contact Page

Users can reach out to the creator of the app by filling out the form. The form is validated by the following rules.
| Property | Rule |
|--------------|---------------------|
| Sender Name | 2 ~ 20 letters |
| Sender Email | Proper email format |
| Title | 2 ~ 30 letters |  
| Message | 2 ~ 1000 letters |

## 📊 ERD

![ERD](./public/files/erd.png)

## 😀 Creator

<div style="display: flex; gap: 30px">
  <div style='width: 300px;'>
    <img src="/public/creatorPicture.jpg" alt="Creator Picture" width='100' style="width: 120px; height: 120px; margin-bottom: 10px; border-radius: 100%; object-position: center; object-fit: cover; "/>
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
  <div>
    <span style="font-weight: 600;" >Masahiro Takechi</span>
    <p>Born and raised in Kochi, Japan (Japanese). I started attending college in Arkansas from Sep. 2019 to May 2021. Then, I transferred to BYU-Idaho in Sep. 2021. My major is Computer Science and anticipated graduation month is Dec. 2024. I look for an internship as a software engineer or front-end developer. Feel free to reach out to me via social media accounts!!</p>
  </div>
</div>

<br>

## ✌️ Future Updates

- [ ] randomly select from tags in Settings
- [ ] able to bookmark their own quote
- [ ] total likes on profile

## 🤝 Support

Contributions, issues, and feature requests are welcome!
Give a ⭐️ if you like this project!

<a href="https://www.buymeacoffee.com/masahirotakechi" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
