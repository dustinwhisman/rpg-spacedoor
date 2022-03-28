import React from 'react';
import { render } from 'react-dom';
import { stats } from '../rules/stats';

const StatsAndSkills = () => (
  <>
    <ul>
      {stats.map((stat) => (
        <li key={stat.name}>
          {stat.name}
          {stat.skills.length > 0 && (
            <ul>
              {stat.skills.map((skill) => (
                <li key={skill.name}>
                  {skill.name}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
    {stats.map((stat) => (
      <React.Fragment key={stat.name}>
        <h3>{stat.name}</h3>
        <p>{stat.description}</p>
        {stat.skills.length > 0 && (
          <>
            <h4>{stat.name} Skills</h4>
            <dl>
              {stat.skills.map((skill) => (
                <React.Fragment key={skill.name}>
                  <dt>{skill.name}</dt>
                  <dd>{skill.description}</dd>
                </React.Fragment>
              ))}
            </dl>
          </>
        )}
      </React.Fragment>
    ))}
  </>
);

export const renderStats = () => {
  const element = document.querySelector('#stats-and-skills');

  if (element) {
    render(<StatsAndSkills />, element);
  }
};
