import chalk from 'chalk';

import { validators } from '@ionic/cli-framework';
import { CommandLineInputs, CommandLineOptions, CommandMetadata, OptionGroup } from '@ionic/cli-utils';
import { Command } from '@ionic/cli-utils/lib/command';
import { PROJECT_FILE } from '@ionic/cli-utils/lib/project';

export class ConfigSetCommand extends Command {
  async getMetadata(): Promise<CommandMetadata> {
    return {
      name: 'set',
      type: 'global',
      description: 'Set config values',
      longDescription: `
By default, this command sets JSON properties in your project's ${chalk.bold(PROJECT_FILE)} file.

For ${chalk.green('--global')} config, the CLI sets properties in the global CLI config file (${chalk.bold('~/.ionic/config.json')}).

For nested properties, separate nest levels with dots. For example, the property name ${chalk.green('user.email')} will look in the ${chalk.bold('user')} object (a root-level field in the global CLI config file) for the ${chalk.bold('email')} field.

${chalk.green('ionic config set')} will attempt to coerce ${chalk.green('value')} into a suitable JSON type. If it is JSON-parsable, such as ${chalk.green('true')} or ${chalk.green('[]')}, it takes the parsed result. Otherwise, the value is interpreted as a string. For stricter input, use ${chalk.green('--json')}, which will error with non-JSON values.

By default, if ${chalk.green('property')} exists and is an object or an array, the value is not overwritten. To disable this check and always overwrite the property, use ${chalk.green('--force')}.
      `,
      inputs: [
        {
          name: 'property',
          description: 'The property name you wish to set',
          validators: [validators.required],
        },
        {
          name: 'value',
          description: 'The new value of the given property',
          validators: [validators.required],
        },
      ],
      options: [
        {
          name: 'global',
          description: 'Use global CLI config',
          type: Boolean,
          aliases: ['g'],
        },
        {
          name: 'json',
          description: `Always interpret ${chalk.green('value')} as JSON`,
          type: Boolean,
        },
        {
          name: 'force',
          description: 'Always overwrite existing values',
          type: Boolean,
          groups: [OptionGroup.Advanced],
        },
      ],
      exampleCommands: ['name newAppName', 'name "\\"newAppName\\"" --json', 'watchPatterns "[]" --force', '-g yarn true'],
    };
  }

  async run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void> {
    const { set } = await import('@ionic/cli-utils/commands/config/set');
    await set(this.env, inputs, options);
  }
}
