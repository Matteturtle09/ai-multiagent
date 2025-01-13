import { ChatGroq } from "@langchain/groq";
import { Agent } from "./src/agent";
import Team from "./src/team";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0.5,
});

const agent = new Agent({
  name: "Agent 1",
  role: "Developer that can't cook",
  model: model,
  tools: [],
});

const agent2 = new Agent({
  name: "Agent 2",
  role: "Chef",
  model: model,
  tools: [],
});

const agent3 = new Agent({
  name: "Agent 3",
  role: "Writer",
  model: model,
  tools: [],
});

const agent4 = new Agent({
  name: "Agent 4",
  role: "Musician",
  model: model,
  tools: [],
});

const agent5 = new Agent({
  name: "Agent 5",
  role: "Scientist",
  model: model,
  tools: [],
});

const agent6 = new Agent({
  name: "Agent 6",
  role: "Artist",
  model: model,
  tools: [],
});

const agent7 = new Agent({
  name: "Agent 7",
  role: "Athlete",
  model: model,
  tools: [],
});

const agent8 = new Agent({
  name: "Agent 8",
  role: "Doctor",
  model: model,
  tools: [],
});

const agent9 = new Agent({
  name: "Agent 9",
  role: "Engineer",
  model: model,
  tools: [],
});

const agent10 = new Agent({
  name: "Agent 10",
  role: "Entrepreneur",
  model: model,
  tools: [],
});

const myTeam = new Team({ name: "Team", agents: [] });

myTeam.addAgent(agent).addAgent(agent2).addAgent(agent3).addAgent(agent4).addAgent(agent5).addAgent(agent6).addAgent(agent7).addAgent(agent8).addAgent(agent9).addAgent(agent10).bindAll();

agent.invoke('Can you write me the business plan?')