const Languages = ({ languages }) => {
  if (!languages || languages.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>Languages</h1>
      <ul>
        {Object.values(languages).map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
