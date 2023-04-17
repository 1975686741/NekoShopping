import {
  createRouter,
  createWebHistory,
  createWebHashHistory 
} from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
      path: "/",
      // name: "home",
      redirect: "/home"
      // component: HomeView
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/home/HomeView.vue")
    },
    {
      path: "/search",
      name: "Search",
      component: () => import("../views/home/search/SearchView.vue")
    },
    {
      path: "/home/newhotlist",
      name: "newhotlist",
      component: () => import("../views/home/new-hot-list/NewHotList.vue")
    },
    {
      path: "/home/location",
      name: "location",
      component: () => import("../views/home/location/MapLocation.vue")
    },
    {
      path: "/home/brand",
      name: "brand",
      component: () => import("../views/home/brand/BrandMaker.vue")
    },
    {
      path: "/home/brand/detail",
      name: "BrandDetail",
      component: () => import("../views/home/brand/BrandDetail.vue")
    },
    {
      path: "/topic",
      name: "topic",
      component: () => import("../views/topic/TopicView.vue")
    },
    {
      path: "/topic/detail",
      name: "TopicDetail",
      component: () => import("../views/topic/Detail.vue")
    },
    {
      path: "/category",
      name: "category",
      component: () => import("../views/category/CategoryView.vue")
    },
    {
      path: "/category/list",
      name: "CategoryList",
      component: () => import("../views/category/CategoryList.vue")
    },

    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/cart/CartView.vue")
    },
    {
      path: "/cart/order",
      name: "cartOrder",
      component: () => import("../views/cart/order/index.vue")
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/user/UserView.vue")
    },
    {
      path: "/user/collection",
      name: "userCollection",
      component: () => import("../views/user/collection/index.vue")
    },
    {
      path: "/user/feedback",
      name: "userFeedBack",
      component: () => import("../views/user/feedback/index.vue")

    },
    {
      path: "/detail/:id",
      props: true,
      name: "ProductDetail",
      component: () => import("../views/product-detail/ProductDetail.vue")
    },
    {
      path: "/order",
      name: "OrderPay",
      component: () => import("../views/pay/OrderPay.vue")
    },
    {
      path: "/address",
      name: "AddressManage",
      component: () => import("../views/user/address/AddressView.vue")
    },
    {
      path: "/address/detail/:flag/:id*",
      name: "AddressDetail",
      component: () => import("../views/user/address/DetailView.vue")
    }
  ],
  // 滚动行为
  // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0
      }
    }
  },
});

export default router;