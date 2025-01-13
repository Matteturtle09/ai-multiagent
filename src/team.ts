import { Agent } from "./agent";

interface TeamData {
  name: string;
  agents: Agent[];
}

export default class Team {
  public data: TeamData;

  constructor(teamData: TeamData) {
    this.data = teamData;
  }

  public addAgent(agent: Agent) {
    this.data.agents.push(agent);
    return this;
  }

  public bindAll() {
    this.data.agents.forEach((currentAgent) => {
      const otherTools = this.data.agents
        .filter((x) => x !== currentAgent)
        .map((x) => x.asTool());
      currentAgent.bindTools(otherTools);
    });
  }
}
