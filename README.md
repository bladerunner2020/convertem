# Convert 'em

Small library that helps with conversion. Could be very helpful when getting values from configuration files (like yaml, etc).

## Installation

```bash
npm install convertem
```

## Usage

- **toNumber** - convert argument to a number or return null if conversion failed

  ```ts
  import { toNumber } from 'convertem';

  toNumber('42'); // 42
  toNumber('0x42'); // 0x42
  toNumber(42); // 42
  toNumber('true'); // 1
  ```

- **toBoolean** - convert argument to a boolean

  ```js
  import { toBoolean } from 'convertem';

  toBoolean('1'); // true
  toBoolean(42); // true
  toBoolean('True'); // true
  toBoolean('yes'); // true
  toBoolean('on'); // true

  toBoolean(); // false
  toBoolean(null); // false
  toBoolean(''); // false
  toBoolean('0'); // false
  toBoolean(0); // false
  toBoolean('FALSE'); // false
  toBoolean('No'); // false
  toBoolean('Off'); // false
  ```

- **toMilliseconds** - convert argument to a milliseconds

  ```js
  import { toMilliseconds } from 'convertem';

  toMilliseconds(42); // 42
  toMilliseconds('42'); // 42
  toMilliseconds('42 ms'); // 42
  toMilliseconds('42 s'); // 42000
  toMilliseconds('42 sec'); // 42000
  toMilliseconds('42 seconds'); // 42000
  toMilliseconds('42 m'); // 42000 * 60
  toMilliseconds('42 min'); // 42000 * 60
  toMilliseconds('42 minutes'); // 42000 * 60
  toMilliseconds('42 h'); // 42000 * 3600
  toMilliseconds('42 hours'); // 42000 * 3600
  toMilliseconds('1:30'); // 90000
  toMilliseconds('42:00:00'); // 42000 * 3600
  toMilliseconds(); // 0
  toMilliseconds(''); // 0
  toMilliseconds(null); // 0
  ```

- **fromMsToString** - convert argument from milliseconds to backward-compatible string

  ```js
   import { fromMsToString } from 'convertem';

  fromMsToString(1000, 'ms'); // 1000 ms
  fromMsToString(1000, 'ss'); // 1 sec
  fromMsToString(1541, 'ss'); // 1 sec
  fromMsToString(1541, 'ss', 2); // 1.54 sec
  fromMsToString(90000, 'mm'); // 1 min
  fromMsToString(90000, 'mm', 1); // 1.5 min
  fromMsToString(5400000, 'hh'); // 1 h
  fromMsToString(5400000, 'hh', 1) // 1.5 h
  fromMsToString(5400000, 'hh:mm'); // 01:30
  fromMsToString(5400000, 'hh:mm:ss'); // 01:30:00
  fromMsToString(1802000, 'mm ss'); // 30 min 2 sec
  fromMsToString(5402000, 'hh mm ss'); // 1 h 30 min 2 sec
  ```
