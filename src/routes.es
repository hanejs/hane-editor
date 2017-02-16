import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

const onUpdateTitle = (nextState, cb) => {
  const { routes, location } = nextState
  if (routes && routes[1]) {
    const { title } = routes[1]
    if (routes[1].title) {
      setTitle(routes[1].title)
    } else if (location.pathname === '/'){
      setTitle(routes[0].title)
    }
  }
  cb()
}

export default (
  <Route path="/"
         title="hanejs editor"
         component={App}
         onChange={(prev, next, rp, cb) => onUpdateTitle(next, cb)}
         onEnter={(next, rp, cb) => onUpdateTitle(next, cb)}>

    <IndexRoute component={Home} />
    <Route path="recommend" component={Home} title="M站_来自二次元的声音_( :3」∠)_" />
    <Route path="albums" component={Home} title="音单" />
    <Route path="catalogs" component={Home} title="分类" />

    <Route path="/rank" component={RankPage} query={{ title: "排行榜" }} title="排行榜" />
    <Route path="/search" component={SearchPage} title="搜索" />
    <Route path="/login" component={LoginPage} title="登录" />
    <Route path="/exam" component={ExamPage} title="答题升级" />

    <Redirect from="/video/:soundId" to="/sound/:soundId" />
    <Route path="/sound/:soundId(/:type)" component={SoundPage} />
    <Route path="/catalogs/:catalogId" component={SoundCatalog} onEnter={onEnterCatalogs} />
    <Route path="/drama" component={DramaPage} query={{ title: "广播剧" }} title="广播剧" />
    <Route path="/drama/filter" component={DramaFilter} query={{ title: "剧集筛选" }} title="剧集筛选" />
    <Route path="/drama/timeline" component={DramaTimeline} query={{ title: "剧集更新表" }} title="剧集更新表" />
    <Route path="/drama/:dramaId" component={DramaDetail} />
    <Route path="/topic/:topicId" component={TopicPage} />
    <Route path="/album/:albumId" component={AlbumPage} />
    <Route path="/albums/:catalogId" component={AlbumCatalog} query={{ title: "音单" }} title="音单" />
    <Route path="/channel/:channelId(/:type)" component={ChannelPage} />
    <Route path="/channels(/:catalog)" component={ChannelCatalog} query={{ title: "频道" }} title="频道" />
    <Route path="/register(/:type)" component={RegisterPage} title="注册" />
    <Route path="/resetpasswd(/:type)" component={ResetPasswdPage} title="忘记密码" />

    <Route path="*" component={NotFound} />

  </Route>
)
