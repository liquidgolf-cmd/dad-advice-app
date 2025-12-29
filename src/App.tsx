import React, { useState } from 'react';
import { Topic } from './types';
import TopicSelector from './components/TopicSelector';
import WorkshopEnvironment from './components/WorkshopEnvironment';

function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleChangeTopic = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="App">
      {!selectedTopic ? (
        <TopicSelector onSelectTopic={handleSelectTopic} />
      ) : (
        <WorkshopEnvironment
          topic={selectedTopic}
          onChangeTopic={handleChangeTopic}
        />
      )}
    </div>
  );
}

export default App;
