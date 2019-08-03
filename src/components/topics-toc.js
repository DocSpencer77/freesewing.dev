import React from 'react'
import TableOfContents from './TableOfContents'
import ExpandedIcon from '@material-ui/icons/KeyboardArrowDown'
import CollapsedIcon from '@material-ui/icons/KeyboardArrowRight'
import { Link } from 'gatsby'

const TopicsToc = props => {
  const topics = props.topics
  const topicsToc = props.topicsToc
  const isDescendant = (checkSlug, baseSlug) => {
    if (checkSlug.slice(0, baseSlug.length) === baseSlug) return true
    return false
  }

  const styles = {
    icon: {
      fontSize: '16px'
    }
  }
  const renderSidebar = () => {
    let items = []
    let order = {}
    for (let topic of topics) order[topicsToc['/' + topic].order] = topic
    order = Object.values(order)
    for (let topic of order) {
      topic = '/' + topic
      let active = isDescendant(props.slug, topic) ? true : false
      items.push(
        <li key={topic} className={active ? 'topic active' : 'topic'}>
          <Link className={active ? 'topic active' : 'topic'} to={topic}>
            {active ? (
              <ExpandedIcon fontSize="inherit" style={styles.icon} />
            ) : (
              <CollapsedIcon fontSize="inherit" style={styles.icon} />
            )}
            {topicsToc[topic].title}
          </Link>
          {active ? renderSidebarLevel(1, topicsToc[topic].children) : null}
        </li>
      )
    }

    return <ul className="topics">{items}</ul>
  }

  const renderSidebarLevel = (level, data) => {
    // Avoid too much recursion
    if (level > 4) return null
    let children = []
    for (let key in data) {
      let grandchildren = null
      let active = isDescendant(props.slug, key) ? true : false
      let current = props.slug === key ? true : false
      if (active && typeof data[key].children !== 'undefined') {
        grandchildren = renderSidebarLevel(level + 1, data[key].children)
      }
      let className = active ? 'active' : 'inactive'
      children.push(
        <li key={key} className={className}>
          <Link className={className} to={key}>
            {active ? (
              <ExpandedIcon fontSize="inherit" style={styles.icon} />
            ) : (
              <CollapsedIcon fontSize="inherit" style={styles.icon} />
            )}
            {data[key].title}
          </Link>
          {current ? <TableOfContents toc={props.toc} slug={key} /> : null}
          {grandchildren}
        </li>
      )
    }

    return <ul className={'topic-links level-' + level}>{children}</ul>
  }

  return renderSidebar()
}

export default TopicsToc
