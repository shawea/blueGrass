import sys
import os

# Look for module_dynamic on the server side
if os.path.exists(os.path.abspath(os.path.join(os.path.split(__file__)[0], '..', '..', 'module'))):
	sys.path.append(os.path.abspath(os.path.join(os.path.split(__file__)[0], '..', '..', 'module')))

import android_tasks, build, check_tasks, customer_goals, customer_phases
import customer_tasks, firefox_tasks, ie_tasks, internal_goals, internal_tasks
import ios_tasks, predicates, web_tasks, wp_tasks, migrate_tasks, safari_tasks
import chrome_tasks, legacy_phases, legacy_predicates, osx_tasks
