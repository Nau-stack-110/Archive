const Notifie = () => {
  const notifications = [
    {
      id: 1,
      title: 'New Document Request',
      message: 'John Doe requested a new birth certificate',
      time: '2 hours ago',
      type: 'request'
    },
    {
      id: 2,
      title: 'Document Approved',
      message: 'Your request for ID card has been approved',
      time: '5 hours ago',
      type: 'success'
    },
    {
      id: 3,
      title: 'System Update',
      message: 'System maintenance scheduled for tomorrow',
      time: '1 day ago',
      type: 'info'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold dark:text-white mb-4">Notifications</h2>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="flex items-center mb-2">
            <span className="material-icons mr-2 text-blue-500">
              {notification.type === 'request' ? 'description' : 
               notification.type === 'success' ? 'check_circle' : 'info'}
            </span>
            <h3 className="text-lg font-semibold dark:text-white">{notification.title}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">{notification.message}</p>
          <span className="text-sm text-gray-500 dark:text-gray-400">{notification.time}</span>
        </div>
      ))}
    </div>
  );
};

export default Notifie;