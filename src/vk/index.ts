import { keyBy } from "lodash-es";

// https://vk.com/dev/permissions
const wallAccessCode = 8192;
const friendsAccessCode = 2;
const ACCESS_LEVEL = wallAccessCode + friendsAccessCode;
const APP_ID = 7412293;

VK.init({
  apiId: APP_ID,
});

export function login(): Promise<vk.OpenAPI.Auth.LoginStatus> {
  return new Promise((resolve, reject) => {
    VK.Auth.login((result) => {
      console.log("🚀 ~ VK.Auth.login ~ result", result);
      if (result.status === "connected") {
        resolve(result);
      } else {
        reject(result);
      }
    }, ACCESS_LEVEL);
  });
}

export function logout(): Promise<void> {
  return new Promise((resolve, reject) => {
    VK.Auth.logout(() => {
      resolve();
    });
  });
}

export function getIsLoggedIn(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      resolve(false);
    }, 2000);

    VK.Auth.getLoginStatus((response) => {
      console.log("🚀 ~ VK.Auth.getLoginStatus ~ response", response);

      const { status } = response;
      clearTimeout(timeout);
      resolve(status === "connected");
    });
  });
}

export function getPosts() {
  return new Promise((resolve, reject) => {
    VK.Api.call(
      "newsfeed.get",
      {
        v: "5.130",
        count: 100,
        filters: "post",
        source_ids: "groups,pages",
        max_photos: 100,
        // start_time: 1618823834,
        // end_time: 1618823834,
      },
      function (result) {
        const { response } = result;
        if (!response) {
          reject(result);
          return;
        }

        // console.log("🚀 ~ returnnewPromise ~ response", response);
        const groupById = keyBy(response.groups, "id");
        const posts = response.items
          .map((rawPost: any) => mapPost(rawPost, groupById))
          .reverse();
        console.log("🚀 ~ returnnewPromise ~ posts", posts);
        resolve(posts);
      }
    );
  });
}

function mapPost(rawPost: any, groupById: any) {
  return {
    ...rawPost,
    dateRaw: rawPost.date,
    date: makeDateFromUnixTime(rawPost.date),
    source_name: groupById[-rawPost.source_id].name,
    avatar_src: groupById[-rawPost.source_id].photo_50,
    url: makePostUrl(rawPost),
  };
}

function makeDateFromUnixTime(unixTimeStamp: number) {
  return new Date(unixTimeStamp * 1000);
}

function makePostUrl(post: any) {
  return `https://vk.com/wall${post.source_id}_${post.post_id}`;
}
