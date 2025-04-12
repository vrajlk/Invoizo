import { UserPlusIcon } from "./icons/UserPlusIcon"

function UsersTable() {
  const users = [
    {
      id: 1,
      name: "Yiorgos Avraamu",
      status: "New",
      registered: "Jan 10, 2023",
      country: "us",
      flag: "🇺🇸",
      usage: 50,
      activity: "Last login",
      timeAgo: "10 seconds ago",
    },
    {
      id: 2,
      name: "Avram Tarasios",
      status: "Recurring",
      registered: "Jan 10, 2023",
      country: "br",
      flag: "🇧🇷",
      usage: 22,
      activity: "Last login",
      timeAgo: "5 minutes ago",
    },
    {
      id: 3,
      name: "Quintin Ed",
      status: "New",
      registered: "Jan 10, 2023",
      country: "in",
      flag: "🇮🇳",
      usage: 74,
      activity: "Last login",
      timeAgo: "1 hour ago",
    },
    {
      id: 4,
      name: "Enéas Kwadwo",
      status: "New",
      registered: "Jan 10, 2023",
      country: "fr",
      flag: "🇫🇷",
      usage: 98,
      activity: "Last login",
      timeAgo: "1 week ago",
    },
    {
      id: 5,
      name: "Agapetus Tadeáš",
      status: "New",
      registered: "Jan 10, 2023",
      country: "es",
      flag: "🇪🇸",
      usage: 22,
      activity: "Last login",
      timeAgo: "3 months ago",
    },
    {
      id: 6,
      name: "Friderik Dávid",
      status: "New",
      registered: "Jan 10, 2023",
      country: "pl",
      flag: "🇵🇱",
      usage: 43,
      activity: "Last login",
      timeAgo: "1 year ago",
    },
  ]

  const getProgressColor = (usage) => {
    if (usage >= 90) return "progress-red"
    if (usage >= 70) return "progress-green"
    if (usage >= 40) return "progress-yellow"
    return "progress-red"
  }

  return (
    <div className="users-table-card">
      <div className="users-table-header">
        <div className="users-table-title">
          <div>Users</div>
          <div className="users-table-subtitle">1,232.15 registered users</div>
        </div>
        <button className="add-user-button">
          <UserPlusIcon />
          <span>Add new user</span>
        </button>
      </div>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Country</th>
              <th>Usage</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">
                      <img src={`/avatar-${user.id}.jpg`} alt={`${user.name} avatar`} />
                    </div>
                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-status">
                        {user.status} | Registered: {user.registered}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="country-flag">{user.flag}</div>
                </td>
                <td>
                  <div className="usage-cell">
                    <div className="usage-value">{user.usage}%</div>
                    <div className="progress-bar-container">
                      <div
                        className={`progress-bar ${getProgressColor(user.usage)}`}
                        style={{ width: `${user.usage}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="activity-cell">
                    <div className="activity-type">{user.activity}</div>
                    <div className="activity-time">{user.timeAgo}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersTable
