type Channel = {
  id: number
  name: string
}

type MoreAction = {
  visible: boolean
  articleId: string
  channelId: number
}

type Article = {
  art_id: string
  title: string
  aut_id: string
  aut_name: string
  comm_count: string
  pubdate: string
  cover: {
    type: string
    images: string[]
  }
}

type Articles = {
  [index: number]: {
    timestamp: string
    list: Article[]
  }
}

type HomeType = {
  userChannels: Channel[]
  allChannels: Channel[]
  articles: Articles
  moreAction: MoreAction
}

const initValue: HomeType = {
  userChannels: [],
  allChannels: [],
  // 存储所有的文章列表
  articles: {},
  moreAction: {
    visible: false,
    articleId: '',
    channelId: -1,
  },
} as HomeType

type HomeAction =
  | {
      type: 'home/saveChannels'
      payload: Channel[]
    }
  | {
      type: 'home/saveAllChannels'
      payload: Channel[]
    }
  | {
      type: 'home/saveArticleList'
      payload: {
        channelId: number
        timestamp: string
        list: Article[]
      }
    }
  | {
      type: 'home/saveMoreArticleList'
      payload: {
        channelId: number
        timestamp: string
        list: Article[]
      }
    }
  | {
      type: 'home/setMoreAction'
      payload: MoreAction
    }

export default function reducer(state = initValue, action: HomeAction) {
  switch (action.type) {
    case 'home/saveChannels':
      return {
        ...state,
        userChannels: action.payload,
      }
    case 'home/saveAllChannels':
      return {
        ...state,
        allChannels: action.payload,
      }
    case 'home/saveArticleList':
      const { list, timestamp, channelId } = action.payload

      return {
        ...state,
        articles: {
          ...state.articles,
          [channelId]: {
            timestamp: timestamp,
            // 如果是loadMore，追加数据，否则，覆盖数据
            list: list,
          },
        },
      }
    case 'home/saveMoreArticleList':
      // const oldList = state.articles[action.payload.channelId].list
      return {
        ...state,
        articles: {
          ...state.articles,
          [action.payload.channelId]: {
            timestamp: action.payload.timestamp,
            list: [
              ...state.articles[action.payload.channelId].list,
              ...action.payload.list,
            ],
          },
        },
      }
    case 'home/setMoreAction': {
      return {
        ...state,
        moreAction: action.payload,
      }
    }
    default:
      return state
  }
}
