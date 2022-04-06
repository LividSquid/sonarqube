/*
 * SonarQube
 * Copyright (C) 2009-2022 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import { cloneDeep } from 'lodash';
import { NewUserToken, UserToken } from '../../types/types';
import { generateToken, getTokens, revokeToken } from '../user-tokens';

const RANDOM_RADIX = 36;
const RANDOM_PREFIX = 2;

const defaultTokens = [
  {
    name: 'local-scanner',
    createdAt: '2022-03-07T09:02:59+0000',
    lastConnectionDate: '2022-04-07T09:51:48+0000'
  },
  {
    name: 'test',
    createdAt: '2020-01-23T19:25:19+0000'
  }
];

export default class UserTokensMock {
  tokens: Array<Partial<NewUserToken> & UserToken>;

  constructor() {
    this.tokens = cloneDeep(defaultTokens);

    (getTokens as jest.Mock).mockImplementation(this.handleGetTokens);
    (generateToken as jest.Mock).mockImplementation(this.handleGenerateToken);
    (revokeToken as jest.Mock).mockImplementation(this.handleRevokeToken);
  }

  handleGetTokens = () => {
    return Promise.resolve(cloneDeep(this.tokens));
  };

  handleGenerateToken = ({ name, login }: { name: string; login?: string }) => {
    const token = {
      name,
      login,
      token: Math.random()
        .toString(RANDOM_RADIX)
        .slice(RANDOM_PREFIX),
      createdAt: '2022-04-04T04:04:04+0000'
    };

    this.tokens.push(token);

    return Promise.resolve(token);
  };

  handleRevokeToken = ({ name }: { name: string; login?: string }) => {
    const index = this.tokens.findIndex(t => t.name === name);

    if (index < 0) {
      return Promise.resolve();
    }

    this.tokens.splice(index, 1);

    return Promise.resolve();
  };

  getTokens = () => {
    return cloneDeep(this.tokens);
  };

  reset = () => {
    this.tokens = cloneDeep(defaultTokens);
  };
}
