import chalk from 'chalk';

declare global {
  interface String {
    proper(): string;
    caps(): string;
  }
}

String.prototype.proper = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.caps = function (): string {
  return this.toUpperCase();
};

function displayProfiles(profiles: any) {
  for (const key of Object.keys(profiles)) {
    if (key === 'name') continue;
    const profile = profiles[key];
    console.log(`${key.caps()} Profile ${key === profiles.name ? '(active)' : '(inactive)'}`);
    console.log(`  ${chalk.blue('Method')}: ${key}`);
    console.log(`  ${chalk.red('DID')}: ${!profile.did ? chalk.underline('Unset') : profile.did}`);
    console.log(`  ${chalk.blue('Password')}: ${profile.password ?? chalk.underline('Unset')}`);
    console.log(`  ${chalk.blue('Recovery Phrase')}: ${profile.recoveryPhrase ?? chalk.underline('Unset')}`);
    console.log(`  ${chalk.blue('Data Path')}: ${profile.web5DataPath ?? chalk.underline('Unset')}`);
    console.log(`  ${chalk.blue('DWN Endpoints')}:`);
    if (profile.dwnEndpoints.length) {
      const formatted = profile.dwnEndpoints.map((endpoint: string) => `    - ${endpoint}`);
      console.log(`${formatted.join('\n')}`);
    } else {
      console.log(`    - Unset`);
    }
    console.log();
  }
}

displayProfiles({
  name : 'dht',
  dht     : {
    password       : 'tree spawn garlic vicious rigid glare',
    did            : 'did:dht:tzarizg6dprr5x8djfy35h7k86z7hy9bdzzsa4jd9qt7rtnjqg1o',
    recoveryPhrase : 'brick squeeze weird harbor judge crush token wise scale when correct actor',
    dwnEndpoints   : [ 'https://dwn.nonni.org' ],
    web5DataPath   : '/Users/bryan/.config/drpm/DATA/DHT/AGENT'
  },
  web : {
    did            : '',
    dwnEndpoints   : [],
    web5DataPath   : '',
    password       : '',
    recoveryPhrase : ''
  },
  btc : {
    did            : '',
    dwnEndpoints   : [],
    web5DataPath   : '',
    password       : '',
    recoveryPhrase : ''
  }
});