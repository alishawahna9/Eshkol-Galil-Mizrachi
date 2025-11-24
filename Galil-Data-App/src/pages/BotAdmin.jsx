import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Trash2, Edit2, Plus, Save } from 'lucide-react';

const styles = {
  page: "min-h-screen bg-gray-50 dark:bg-[#0F1F38] py-8",
  container: "max-w-5xl mx-auto px-6",
  header: "mb-8",
  title: "text-3xl font-bold text-[#0F1F38] dark:text-white mb-2",
  subtitle: "text-gray-600 dark:text-gray-400",
  successMessage: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg mb-6",
  errorMessage: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6",
  tabs: "flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700",
  tab: "px-6 py-3 font-medium cursor-pointer transition-colors",
  tabActive: "text-[#22A7D6] border-b-2 border-[#22A7D6]",
  tabInactive: "text-gray-600 dark:text-gray-400 hover:text-[#22A7D6]",
  card: "bg-white dark:bg-[#1B4C8C] rounded-xl shadow-md p-6 mb-6",
  cardTitle: "text-xl font-bold text-[#0F1F38] dark:text-white mb-6",
  formGroup: "mb-4",
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
  input: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0F1F38] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#22A7D6] focus:border-transparent",
  textarea: "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0F1F38] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#22A7D6] focus:border-transparent min-h-[100px]",
  checkboxLabel: "flex items-center gap-2 cursor-pointer",
  checkbox: "w-5 h-5 text-[#22A7D6] border-gray-300 rounded focus:ring-[#22A7D6]",
  button: "bg-[#22A7D6] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1B4C8C] transition-colors",
  emptyState: "text-center py-12",
  emptyStateIcon: "text-6xl mb-4",
  table: "w-full",
  tableHeader: "bg-gray-50 dark:bg-[#0F1F38]",
  th: "px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300",
  td: "px-4 py-3 text-sm text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700",
  actions: "flex gap-2 justify-end",
  actionButton: "w-5 h-5 text-red-600 dark:text-red-400 cursor-pointer hover:text-red-800 dark:hover:text-red-300"
};

export default function BotAdmin() {
  const [activeTab, setActiveTab] = useState('config');
  const [config, setConfig] = useState(null);
  const [trainingData, setTrainingData] = useState([]);
  const [editingConfig, setEditingConfig] = useState(null);
  const [editingTraining, setEditingTraining] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const configs = await base44.entities.BotConfig.list();
      if (configs.length > 0) {
        setConfig(configs[0]);
        setEditingConfig(configs[0]);
      } else {
        const newConfig = {
          bot_name: 'עוזר גליל מזרחי',
          welcome_message: 'שלום! איך אוכל לעזור לך היום?',
          is_active: true,
          database_type: 'base44',
          bot_personality: 'מקצועי ועוזר'
        };
        const created = await base44.entities.BotConfig.create(newConfig);
        setConfig(created);
        setEditingConfig(created);
      }

      const training = await base44.entities.BotTrainingData.list();
      setTrainingData(training);
    } catch (error) {
      console.error('Error loading data:', error);
      showMessage('error', 'שגיאה בטעינת הנתונים');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSaveConfig = async () => {
    try {
      await base44.entities.BotConfig.update(config.id, editingConfig);
      setConfig(editingConfig);
      showMessage('success', 'ההגדרות נשמרו בהצלחה');
    } catch (error) {
      console.error('Error saving config:', error);
      showMessage('error', 'שגיאה בשמירת ההגדרות');
    }
  };

  const handleAddTraining = async () => {
    if (!editingTraining?.question || !editingTraining?.answer) {
      showMessage('error', 'יש למלא שאלה ותשובה');
      return;
    }

    try {
      const newData = await base44.entities.BotTrainingData.create(editingTraining);
      setTrainingData([...trainingData, newData]);
      setEditingTraining(null);
      showMessage('success', 'נתוני אימון נוספו בהצלחה');
    } catch (error) {
      console.error('Error adding training data:', error);
      showMessage('error', 'שגיאה בהוספת נתוני אימון');
    }
  };

  const handleDeleteTraining = async (id) => {
    try {
      await base44.entities.BotTrainingData.delete(id);
      setTrainingData(trainingData.filter(item => item.id !== id));
      showMessage('success', 'נתוני אימון נמחקו בהצלחה');
    } catch (error) {
      console.error('Error deleting training data:', error);
      showMessage('error', 'שגיאה במחיקת נתוני אימון');
    }
  };

  return (
    <div className={styles.page} dir="rtl">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>ניהול צ'אטבוט</h1>
          <p className={styles.subtitle}>הגדרות ואימון העוזר האוטומטי</p>
        </div>

        {message.text && (
          <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === 'config' ? styles.tabActive : styles.tabInactive}`}
            onClick={() => setActiveTab('config')}
          >
            הגדרות בסיסיות
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'training' ? styles.tabActive : styles.tabInactive}`}
            onClick={() => setActiveTab('training')}
          >
            נתוני אימון
          </div>
        </div>

        {/* Config Tab */}
        {activeTab === 'config' && editingConfig && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>הגדרות הבוט</h2>

            <div className={styles.formGroup}>
              <label className={styles.label}>שם הבוט</label>
              <input
                type="text"
                value={editingConfig.bot_name}
                onChange={(e) => setEditingConfig({ ...editingConfig, bot_name: e.target.value })}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>הודעת פתיחה</label>
              <textarea
                value={editingConfig.welcome_message}
                onChange={(e) => setEditingConfig({ ...editingConfig, welcome_message: e.target.value })}
                className={styles.textarea}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>אופי הבוט</label>
              <textarea
                value={editingConfig.bot_personality}
                onChange={(e) => setEditingConfig({ ...editingConfig, bot_personality: e.target.value })}
                className={styles.textarea}
                placeholder="לדוגמה: מקצועי, ידידותי, מסייע"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={editingConfig.is_active}
                  onChange={(e) => setEditingConfig({ ...editingConfig, is_active: e.target.checked })}
                  className={styles.checkbox}
                />
                <span>הבוט פעיל</span>
              </label>
            </div>

            <button onClick={handleSaveConfig} className={styles.button}>
              <Save className="w-4 h-4 inline ml-2" />
              שמור הגדרות
            </button>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>הוסף נתוני אימון חדשים</h2>

              <div className={styles.formGroup}>
                <label className={styles.label}>שאלה</label>
                <input
                  type="text"
                  value={editingTraining?.question || ''}
                  onChange={(e) => setEditingTraining({ ...editingTraining, question: e.target.value })}
                  className={styles.input}
                  placeholder="לדוגמה: מה שעות הפעילות?"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>תשובה</label>
                <textarea
                  value={editingTraining?.answer || ''}
                  onChange={(e) => setEditingTraining({ ...editingTraining, answer: e.target.value })}
                  className={styles.textarea}
                  placeholder="התשובה שהבוט יחזיר"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>קטגוריה</label>
                <input
                  type="text"
                  value={editingTraining?.category || 'כללי'}
                  onChange={(e) => setEditingTraining({ ...editingTraining, category: e.target.value })}
                  className={styles.input}
                />
              </div>

              <button onClick={handleAddTraining} className={styles.button}>
                <Plus className="w-4 h-4 inline ml-2" />
                הוסף נתוני אימון
              </button>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>נתוני אימון קיימים ({trainingData.length})</h2>

              {trainingData.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>📚</div>
                  <p>אין עדיין נתוני אימון. הוסף כמה שאלות ותשובות כדי לאמן את הבוט.</p>
                </div>
              ) : (
                <table className={styles.table}>
                  <thead className={styles.tableHeader}>
                    <tr>
                      <th className={styles.th}>שאלה</th>
                      <th className={styles.th}>תשובה</th>
                      <th className={styles.th}>קטגוריה</th>
                      <th className={styles.th}>פעולות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainingData.map((item) => (
                      <tr key={item.id}>
                        <td className={styles.td}>{item.question}</td>
                        <td className={styles.td}>{item.answer.substring(0, 50)}...</td>
                        <td className={styles.td}>{item.category}</td>
                        <td className={styles.td}>
                          <div className={styles.actions}>
                            <Trash2
                              className={styles.actionButton}
                              onClick={() => handleDeleteTraining(item.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}