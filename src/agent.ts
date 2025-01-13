import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import type { Tool } from "langchain/tools";
import { z } from "zod";

export type AgentData = {
  name: string;
  role: string;
  model: BaseChatModel;
  tools: Tool[];
};

export class Agent {
  public data: AgentData;

  constructor(agentData: AgentData) {
    this.data = agentData;
  }

  public bindTools(tools: Tool[]) {
    if (this.data.model.bindTools) {
      this.data.model = this.data.model.bindTools(tools);
      this.data.tools = tools;
    }
  }

  public asTool() {
    const toolFunction = this.invoke.bind(this);
    const agentTool = tool(toolFunction, {
      name: this.data.name,
      description: `Agent tool for ${this.data.name} ${this.data.role}.`,
      schema: z.object({ prompt: z.string() }),
    });

    return agentTool;
  }

  public async invoke(prompt: string) {
    const messages = [
      new HumanMessage(
        `You are ${this.data.name} (${this.data.role}): ${JSON.stringify(
          prompt
        )}. Use tools only if strictly necessary to call another agent.`
      ),
    ];
    const aiMessage = await this.data.model.invoke(messages);
    messages.push(aiMessage);
    console.log(aiMessage);

    for (const toolCall of aiMessage?.tool_calls) {
      const selectedTool = this.data.tools.find(
        (tool) => tool.name === toolCall.name
      );
      if (selectedTool) {
        console.log(selectedTool.description);
        const toolMessage = await selectedTool.invoke({
          prompt: toolCall.args.prompt,
        });
        messages.push(toolMessage);
      }
    }
    return await this.data.model.invoke(messages);
  }
}

